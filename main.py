from flask import Flask, jsonify, redirect, request, Response, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import  UserMixin, login_user, LoginManager, current_user, logout_user, login_required, user_logged_in
from flask_mail import Mail, Message
from itsdangerous import json, URLSafeTimedSerializer, SignatureExpired
from sqlalchemy.sql.expression import func
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
import random
import secrets
import os


app = Flask(__name__, static_folder="./build", static_url_path="/")
app.config['SECRET_KEY'] = 'Some Secret Key'

# flask_mail config

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": "your@email.com",
    "MAIL_PASSWORD": 'password'
}
app.config.update(mail_settings)
mail = Mail(app)

timed_url = URLSafeTimedSerializer(app.config["SECRET_KEY"])

# db config
# the uri path is to fix a problome when deploying in heroko with sqlalchemy
uri = os.getenv("DATABASE_URL") 
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
else:
    uri = "sqlite:///random_api.db"

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    api_key = db.Column(db.String(100))


class Words(db.Model):
    __tablename__ = "words"
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100))
    word_length = db.Column(db.Integer)

db.create_all()

def send_confirmation_email(email):
    confirmation_token = timed_url.dumps(email, salt="email-confirm")
    conf_link = url_for("confirm_email", token=confirmation_token, _external=True)

    # sending the mail
    msg = Message(  subject="Confirm Email for random api", 
                    sender=app.config.get("MAIL_USERNAME"), 
                    recipients=[email],
                    body=f"To confirm your email go to: \n {conf_link} \n The link will expaird in 24 hours."
                    )   
    
    mail.send(msg)

def send_reset_password(email):
    reset_token = timed_url.dumps(email, salt="reset-password")
    reset_link = url_for("handle_reset_token", token=reset_token, _external=True)

    msg = Message ( subject="Link for password reset random-api",
                    sender=app.config.get("MAIL_USERNAME"),
                    recipients=[email],
                    body=f"To reset your password go to: \n {reset_link} The link will expaird in 1 hour."
                    )

    mail.send(msg)

# checks if there are words in the "word" table in the db and if not will add them from the "words.txt" file
if not Words.query.get(1):
    print("adding data")
    with open("./words.txt") as f:
        word_list = f.readlines()
    
    for wo in word_list:
        wor = wo.replace("\n", "")
        new_word = Words(
            word=wor,
            word_length=len(wor)    
        )
        db.session.add(new_word)

    db.session.commit()
    print("data added")

# a decortor that will check if a key was provided and will validet the key if so
def check_key(func):
    @wraps(func)
    def inner(*args, **kwargs):

        # get the key from the headers
        key = request.headers.get('key')
        if key:
            # checks if the key exsits
            if User.query.filter_by(api_key=key).first():
                return func(*args, **kwargs)
            # if the key is not valid
            else:
                return jsonify({
                    "status":"FAILD",
                    "message":"check your key"})
        # if no key was provided
        else:
            return jsonify({
                "status":"FAILD",
                "message":"u need to have a key"}), 401
    return inner

# when u refresh in a react route it will return a 404 this will handle the 404 and will return the react static file that will know what to do with that url if it exsits
@app.errorhandler(404)
def not_fount(error):
    return app.send_static_file("index.html")

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route("/")
def home():
    return app.send_static_file("index.html")
    
# api route
@app.route("/api/numbers")
@check_key
def get_numbers():
    # get the parmas 
    ran = request.args.get("range")
    amount = request.args.get("amount")

    # if amount was not given will set it to 1 by default
    if not amount:
        amount = "1"

    # if range was not given will set it to 1000 by default
    if not ran:
        ran = "0,1000"

    amount = int(amount)

    ran = ran.split(",")

    numbers = [random.randint(int(ran[0]), int(ran[1])) for _ in range(amount) ]
        
    return jsonify({
        "status":"SUCCESS",
        "message":"SUCCESS",
        "data":{"numbers": numbers}}), 200

# api route
@app.route("/api/words")
@check_key
def get_words():    
    
    length = request.args.get("length")
    amount = request.args.get("amount")

    # if amount was not given will set it to 1 by default
    if not amount:
        amount = "1"

    amount = int(amount)

    # query the words from the db
    if not length:
        data = Words.query.order_by(func.random()).limit(amount).all()
    else:
        data = Words.query.filter_by(word_length=length).order_by(func.random()).limit(amount).all()

    # conveting the rows from the db to a list with dict
    words_data = [{"word": wor.word, "length": wor.word_length} for wor in data]

    return jsonify({
        "status":"SUCCESS",
        "message":"SUCCESS",
        "data":{"words": words_data}}), 200

# route for crating new user
@app.route("/api/register", methods=["POST"])
def register_new_user():
    new_user = json.loads(request.data.decode("utf-8"))
    new_user_email = new_user["email"]
    # if a user with that email laredy exists will return a 303 status code
    if User.query.filter_by(email=new_user_email).first():
        return Response(status=303)            

    # encript the password
    hash_and_salted_password = generate_password_hash(
        new_user["password"],
        method='pbkdf2:sha256',
        salt_length=10
    )

    # crate the new user and add him to the db
    # need to make the user inactive until the token is aproved
    crate_user = User(
        name = new_user["name"],
        email = new_user_email,
        password = hash_and_salted_password,
        api_key = "You need to confirm your email to get one"
    )
    db.session.add(crate_user)
    db.session.commit()

    send_confirmation_email(new_user_email)

    # test if the user was crated
    if not User.query.filter_by(email=new_user["email"]).first():
        return Response(status=500)

    # login the new user
    login_user(crate_user)
    return Response(status=201)

# route for login in user
@app.route("/api/login", methods=["POST"])
def login():
    data = json.loads(request.data.decode("utf-8"))
    email_enterd = data["email"]
    password_enterd = data["password"]
    user = User.query.filter_by(email=email_enterd).first()

    if not user:
        return Response(status=401)
        
    elif not check_password_hash(user.password, password_enterd):
        return Response(status=401)

    else:
        login_user(user)
        return Response(status=201)

# I discovered the "@login_required" dec after I set the try and except 
# route for login out user
@app.route("/api/logout", methods=["POST"])
@login_required
def logout():  
    try:
        logout_user()
    except:
        return Response(status=500)

    return Response(status=200)

# route for checking if user is connected
@app.route("/api/userLogedIn", methods=["POST"])
def check_user():
    if current_user.is_authenticated:
        return Response(status=304)
    else:
        return Response(status=200)

# I discovered the "@login_required" dec after I set if statement
# get account info
@app.route("/api/account-info", methods=["POST"])
@login_required
def get_info():
    if current_user.is_authenticated:        
        res = {
            "name":current_user.name,
            "email": current_user.email,
            "key": current_user.api_key
        }
        return jsonify(res)
    else:
        return Response(status=401)


# confirming a email
@app.route("/api/confirm-email/<token>")
def confirm_email(token):
    try:
        email_to_confirm = timed_url.loads(token, salt="email-confirm", max_age=(86400))
    except SignatureExpired:
        return f'link expiard u can make a new one in "My account"'
    except:
        return "unkown error try again and check the link"
    else:
        user_to_confirm = User.query.filter_by(email=email_to_confirm).first()
        user_to_confirm.api_key = secrets.token_urlsafe(16)
        db.session.commit()
            
    return redirect(url_for("home", _external =True))

# request a new confirm link to email
@app.route("/api/new-confiramtion-mail", methods=["POST"])
def send_new_conf_mail():
    if current_user.api_key == "U need to confirm your email to get one":
        send_confirmation_email(current_user.email)
        return Response(status=201)
    else:
        return Response(status=304)

# handle the case where a user forget is password and requested a reset link
@app.route("/api/request-password-reset", methods=["POST"])
def send_reset_email():
    data = json.loads(request.data.decode("utf-8"))
    email = data["email"]
    if User.query.filter_by(email=email).first():
        send_reset_password(email)
        return Response(status=201)
    else:
        return Response(status=401)

# handle the reset token if its a valid one will log in the user and redirect him to a change password page
@app.route("/api/handle-reset-token/<token>")
def handle_reset_token(token):
    try:
        email = timed_url.loads(token, salt="reset-password", max_age=(3600))
    except SignatureExpired:
        return "link expiard u can request a new one"
    except:
        return "unkown error try again and check the link"
    else:
        user_to_reset = User.query.filter_by(email=email).first()
        login_user(user_to_reset)
        return redirect("/change-password")

# change the current user password to a new one
@app.route("/api/change-password", methods=["POST"])
def change_password():
    if current_user.is_authenticated:
        data = json.loads(request.data.decode("utf-8"))
        password = data["password"]
        current_user.password = generate_password_hash(
                                    password,
                                    method='pbkdf2:sha256',
                                    salt_length=10
                                )
        db.session.commit()
        return Response(status=201)

    return Response(status=401)

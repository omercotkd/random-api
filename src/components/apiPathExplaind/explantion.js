const explantionText = [
    {   path: "https://random-api-by-omer.herokuapp.com/api/words",
        head: "Random words:", 
        RequestHeaders: {key: "A key you got provided."},
        QueryParams: {amount: "The amount of words you want, has to be a number greater than 0. If not provided will return one word.",
                      length: "the length of the word, if not provided will return a random length"},
        response: {url: "https://random-api-by-omer.herokuapp.com/api/words?amount=2&length=5",
                   photo: "/photos/wordsData.png"},
        id: 1
    },
    {path: "https://random-api-by-omer.herokuapp.com/api/numbers",
    head: "Random numbers:", 
    RequestHeaders: {key: "A key you got provided."},
    QueryParams: {amount: "The amount of numbers you want needs to be a number greater than 0. If not provided will return one number.",
                  range: 'The range of the numbers between 1 to x needs to be a string separated by a comma e.g: 1,1000 with no spaces. If not provided, the range is set by default to 1,1000.'},
    response: {url: "https://random-api-by-omer.herokuapp.com/api/numbers?range=10,50&amount=5",
                photo: "/photos/numbersData.png"},
    id: 2
    }
];

export default explantionText;
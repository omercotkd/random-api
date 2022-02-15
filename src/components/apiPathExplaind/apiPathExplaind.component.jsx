import React from "react";
import "./apiPathExplaind.style.css";

import { Container, Row, Col } from "react-bootstrap";

const ApiPathExplaind = (props) => {

    return(
        <div className="explain-div">
            <h2 className="head-line">{props.data.head}  </h2>
            <p className="sub-head-line"><b>url:</b> {props.data.path}</p>
            <Container className="parms-table">
            <Row>
                <Col><h5>Request Headers</h5></Col>
            </Row>
            <Row>
                <Col><h6>key</h6></Col>
                <Col><h6>value</h6></Col>
                <Col><h6>require</h6></Col>
            </Row>
            <Row>
                <Col><p>key</p></Col>
                <Col><p>{props.data.RequestHeaders.key}</p></Col>
                <Col><p>yes</p></Col>
            </Row>
            </Container>
            <Container className="parms-table">
            <Row>
                <Col><h5>Parameters</h5></Col>
            </Row>
            <Row>
                <Col><h6>key</h6></Col>
                <Col><h6>value</h6></Col>
                <Col><h6>require</h6></Col>
            </Row>
            <Row>
                <Col><p>amount</p></Col>
                <Col><p>{props.data.QueryParams.amount}</p></Col>
                <Col><p>no</p></Col>
            </Row>
            {
            props.data.QueryParams.length ? 
            <Row>
                <Col><p>length</p></Col>
                <Col><p>{props.data.QueryParams.length}</p></Col>
                <Col><p>no</p></Col>
            </Row>
                : 
            <Row>
                <Col><p>range</p></Col>
                <Col><p>{props.data.QueryParams.range}</p></Col>
                <Col><p>no</p></Col>
            </Row> 
            }
            </Container>
            <p className="example-url">{props.data.response.url}</p>
            <h5>Example response for url: </h5>
            <img src={props.data.response.photo}/>
        </div>
    )

};

export default ApiPathExplaind;
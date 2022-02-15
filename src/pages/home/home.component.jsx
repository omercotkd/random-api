import React, { useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import ApiPathExplaind from "../../components/apiPathExplaind/apiPathExplaind.component";
import explantionText from "../../components/apiPathExplaind/explantion";

import "./home.style.css"

const HomePage = () => {

    return(
        <div>
        <Container>
        <Row>
            {
                explantionText.map(item => <Col xs={12} md={12} lg={12} key={item.id} className="col"><ApiPathExplaind data={item} /></Col>)
            }
         </Row>
        </Container>
        </div>
    )

}

export default HomePage;


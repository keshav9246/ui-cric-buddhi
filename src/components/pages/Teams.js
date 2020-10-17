import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';


class Teams extends Component{
    render(){
        return(<div>
             <style type="text/css">
    {`
    .btn-xxl {
      width: 500px;
     
    }
    `}
    </style>
            
            <Row>
            <Col xs={12} md={12} lg={12}>
            <Button variant="success" size="lg" block >
                    Teams - All
                </Button>
              
            </Col>
            </Row>
            <Row>
            <Col xs={12} md={12} lg={12}>
            <Image src="newteams.png" width = "100%"/>
              
            </Col>

            
            </Row>
            </div>
       );


    }
}
export default Teams;
import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
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
            <Col xs={8} md={4}>
            <Button variant="warning" size="xxl" >
                    Teams - All
                </Button>
              <Image src="teamss.png" width="500px"  height="250px"/>
            </Col>
            </Row>
            </div>
       );


    }
}
export default Teams;
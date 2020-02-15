import React, { Component } from 'react';
import Webcam from "react-webcam";
import All from './All';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

  class Snap extends Component {
      
    
    
        

          
          render() {
            return (
                <Router>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <div>
                                            <Link to={'/All'} className="nav-link">snap</Link>
                                            <Switch>
                                                <Route path='/All' component={All} />  
                                            </Switch>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Router>
            );
        }
    };




export default Snap;
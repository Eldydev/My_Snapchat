import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
            redirect: false
        }

        this.Password = this.Password.bind(this);
        this.Email = this.Email.bind(this);
        this.login = this.login.bind(this);

    }

    Email(event) {
        this.setState({ Email: event.target.value })
    }

    componentWillMount() {
        const cachedToken = localStorage.getItem('token')
        if (cachedToken) {
            this.setState({ redirect: true });
            console.log('lol');
        }
    }

    Password(event) {
        this.setState({ Password: event.target.value })
    }

    login(event) {
        fetch('http://snapchat.wac.under-wolf.eu/connection', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password
            })

        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.status == 200) {
                    localStorage.setItem('user', this.state.Email);
                    localStorage.setItem('token', JSON.stringify(result.data));
                    this.props.history.push("/Dashboard");
                }
                else
                    alert(result.message);
            })

    }
    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect to='/Dashboard'/>
        }
        else {
            return (

                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="9" lg="7" xl="6">
                                <CardGroup>
                                    <Card className="p-2">
                                        <CardBody>

                                            <CardBody className="p-4">
                                                <img class="snap" src="https://miro.medium.com/max/700/0*RsVuJz-3ACmPtxQ_.jpeg"></img>

                                            </CardBody>
                                            <Form>
                                                <InputGroup className="mb-3">
                                                    <Input type="text" onChange={this.Email} placeholder="Enter Email" />
                                                </InputGroup>
                                                <InputGroup className="mb-4">
                                                    <Input type="password" onChange={this.Password} placeholder="Enter Password" />
                                                </InputGroup>
                                                <Button onClick={this.login} color="success" block>Login</Button>
                                                {this.state.redirect}
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }

    }
}

export default Login;
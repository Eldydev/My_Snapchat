import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Reg extends Component {

  constructor() {
    super();

    this.state = {
      Email: '',
      Password: '',
      token: []
    }

    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);

    this.register = this.register.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value })
  }

  componentDidMount() {
    const cachedToken = localStorage.getItem('token')
    if (cachedToken) {
      this.setState({ token: JSON.parse(cachedToken) });
    }
  }


  Password(event) {
    this.setState({ Password: event.target.value })
  }

  register(event) {
    fetch('http://snapchat.wac.under-wolf.eu/inscription', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        password: this.state.Password,
        email: this.state.Email
      })

    }).then((Response) => Response.json())
      .then((Result) => {

        if (Result.status == 200 )
                this.props.history.push("/Dashboard");

        else
          alert(Result.message)
      })
  }

  render() {
    if(this.state.token ['token']){
      this.props.history.push("/Dashboard");
  }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <CardBody className="p-4">
                                                <img class="snap" src="https://miro.medium.com/max/700/0*RsVuJz-3ACmPtxQ_.jpeg"></img>

                                            </CardBody>
                  <Form>
                    <InputGroup className="mb-3">
                      <Input type="text"  onChange={this.Email} placeholder="Enter Email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="password"  onChange={this.Password} placeholder="Enter Password" />
                    </InputGroup>
                    <Button  onClick={this.register}  color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Reg;
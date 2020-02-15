import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Reg from './Reg';
import Snap from './snap';
import Dashboard from './Dashboard';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    }
    this.routelog = this.routelog.bind(this);
    this.routereg = this.routereg.bind(this);
  }

  componentDidMount() {
    const cachedToken = localStorage.getItem('token')
    if (cachedToken) {
      this.setState({ redirect: true });
    }
  }

  routelog() {
    let path = '/connection';
    this.props.history.push(path);
  }

  routereg() {
    let path = 'inscription';
    this.props.history.push(path);
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to='/Dashboard'/>
    }

    return (
      <Router>
        <div className="container">
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <img class="snap" src="https://miro.medium.com/max/700/0*RsVuJz-3ACmPtxQ_.jpeg"></img>
                  <Link to={'/inscription'} onClick={this.routereg} className="nav-link">Sign Up</Link>
                  <Link to={'/connection'} onClick={this.routelog} className="nav-link">Login</Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
        </div>
      </Router>
    );
  }


}


export default Home;
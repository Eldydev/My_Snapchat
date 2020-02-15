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
      token: []
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const cachedToken = localStorage.getItem('token')
    if (cachedToken) {
      this.setState({ token: JSON.parse(cachedToken) });
    }
  }

  logout() {
    localStorage.clear();
    let path = '/';
    this.props.history.push(path);
  }

  render() {

    return (
      <Router>
        <div className="container">
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <img class="snap" src="https://miro.medium.com/max/700/0*RsVuJz-3ACmPtxQ_.jpeg"></img>
                  <Link onClick={this.logout} className="nav-link">LogOut</Link>
                  <Link to={'/snap'} className="nav-link">Snap</Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />>
        </div>
          <Switch>
            <Route exact path='/snap' component={Snap} />
          </Switch>
      </Router>
    );
  }


}


export default Home;
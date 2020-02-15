import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import Reg from './Reg';
import Snap from './snap';
import Dashboard from './Dashboard';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: []
    }
  }

  componentDidMount() {
    const cachedToken = localStorage.getItem('token')
    if (cachedToken) {
      this.setState({ token: JSON.parse(cachedToken) });
    }
  }

  render() {

    return (
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/inscription' component={Reg} />
            <Route path='/connection' component={Login} />
            <Route path='/Dashboard' component={Dashboard} />
          </Switch>
      </Router>
    );
  }


}


export default App;

import React, { Component } from 'react';
import './App.css';
import Snap from './snap';
import Webcam from "react-webcam";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class All extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Token: [],
            All: [],
            Email: "",
            pic: null
        }
        this.change = this.change.bind(this);
        this.all = this.all.bind(this);
        this.capture = this.capture.bind(this);
    }

        componentDidMount() {
            const token = JSON.parse(localStorage.getItem('token'));
            this.setState({Token:token});
            console.log("1-",token['token']);
            fetch('http://snapchat.wac.under-wolf.eu/all', {
            method: 'get',
            headers: {
                "token" : token['token']
            },

            }).then((Response) => Response.json())
            .then((result) => {
                console.log("2-",result);
                if (result.status == 200 ){
                    this.setState({All:result.data});
                    console.log("3-",this.state.All);
                }
                else
                    alert(result.message);
            })
        }

        setRef = webcam => {
            this.webcam = webcam;
        };
        
        capture = () => {
            const imageSrc = this.webcam.getScreenshot();
            console.log(imageSrc);
            this.setState({
                pic: imageSrc
            })
        };

        change(e) {
            this.setState({ [e.target.id]: e.target.value });
        }

        onChangeHandler = (e) => {
            let file = e.target.files[0];
            this.setState({
              pic: file
            })
        }

        picwebcam = (e) => {
            let data = localStorage.getItem('capture');
            this.setState({
              pic: data
            })
        }
        
        all(event) {
            console.log(this.state.pic);
            var formData = new FormData();
            formData.append("duration",5);
            formData.append('to',this.state.Email);
            formData.append('image',this.state.pic);
            console.log(formData);

            fetch('http://snapchat.wac.under-wolf.eu/snap', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': this.state.Token['token']
            },

            body: formData

        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);           
                if (result.status == 200 ){
                    console.log("OK");
                }
                else
                    alert(result.message);
            })
        }

        render() {
            return (
                <Router>
                    <Row className="justify-content-center">
                    <Webcam 
                                            style={{width:100+"%", height:100+"%"}}
                                            audio={false}
                                            ref={this.setRef}
                                            screenshotFormat="image/jpeg"
                                            id="webcam"
                                        />
                                        
                                        <button onClick={this.capture}>capturer webcam</button>
                                    
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <div>
                                        <Form path='/snap' component={Snap}>
                                            <InputGroup className="mb-3">
                                                <select name="all" id="Email" onChange={this.change}>

                                                    <option value="">a qui envoyer ?</option>
                                                    {this.state.All.length > 0 ?
                                                        this.state.All.map((key, value) =>
                                                        <option key={value} value={key.email}>{key.email}</option>
                                                    ) : ""
                                                    }
                                                </select>
                                                <input name="pic" type="file" id="pic" onChange={this.onChangeHandler}/>
                                            </InputGroup>
                                                <Button onClick={this.all} color="success" block>Envoyer</Button>
                                                <Button onClick={this.picwebcam} color="success" block>Envoyer la capture d'ecran</Button>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Router>
            );
        
        
    }
}
export default All;
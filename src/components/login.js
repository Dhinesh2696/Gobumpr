import React from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
//import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showPassword: false
        }
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    getlogin(mob, pwd) {
        var that;
        console.log("in getlogin" + " " + mob + " " + pwd);
        fetch('http://ec2-13-127-109-115.ap-south-1.compute.amazonaws.com:3000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mob,
                password: pwd,
            })
        }).then((res, err) => {
            that=this;
            return res.json()
        }).then(function (data) {

            if (data.status == "success") {
                localStorage.setItem("user", data.mobile);
                console.log(that.props);
                that.props.history.push('/content');
            }
            else {
                alert("Invalid User Credationals");
                document.getElementById('im').value='';
                document.getElementById('ip').value='';
            }

        })
    }

    handleSubmit = (e) => {
        var phoneno = /^\d{10}$/;
        var mob = document.getElementById("im").value;
        if (mob.match(phoneno)) {
            var pwd = document.getElementById("ip").value;
            this.getlogin(mob, pwd);
            e.preventDefault();
            return false;

        }
        else {
            document.getElementById("im").value = "";
            document.getElementById("ip").value = "";
            alert("Mobile not valid");
            e.preventDefault();
            return false;
        }


    }

    loginin() {
        document.getElementById("content").style.display = 'block';
        document.getElementById("content1").style.display = 'none';
    }

    validate() {
        this.props.history.push("/content");

    }

    signin = () => {
        console.log("in signin");
        document.getElementById("content").style.display = 'none';
        document.getElementById("content1").style.display = 'block';
    }
    validateSign = (e) => {
        var phoneno1 = /^\d{10}$/;
        var mob = document.getElementById("im1").value;

        fetch('http://ec2-13-127-109-115.ap-south-1.compute.amazonaws.com:3000/users/sign', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: document.getElementById("im1").value,
                name: document.getElementById("in1").value,
                password: document.getElementById("ip1").value,
            })
        }).then((res, err) => {
            console.log(res, err)
            document.getElementById("im1").value = '';
            document.getElementById("in1").value = '';
            document.getElementById("ip1").value = '';

        })

        this.loginin();
        e.preventDefault();
        return false
    }

    render() {
        const muiTheme = getMuiTheme({
            textField: {

                focusColor: blue500
            }
        });

        return (
            <div>
                <div className={'above-content'}>
                    <div id={"content"} align={'center'}>
                        <h3 style={{color: '#A71823', textAlign: 'center', fontSize: 25}}>Login</h3>
                        <form id={"f1"} onSubmit={this.handleSubmit}>
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <TextField
                                    hintText="Enter valid mobile number"
                                    floatingLabelText="Mobile"
                                    floatingLabelFocusStyle={{color: '#A71823'}}
                                    underlineFocusStyle={{borderColor: '#A71823'}}
                                    type="text"
                                    id={"im"}
                                    maxLength="10"
                                />
                                <br/>
                                <TextField
                                    hintText="Enter the password"
                                    floatingLabelText="Password"
                                    floatingLabelFocusStyle={{color: '#A71823'}}
                                    underlineFocusStyle={{borderColor: '#A71823'}}
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    id={"ip"}
                                    endAdornment={

                                        <IconButton
                                            onClick={this.handleClickShowPasssword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>

                                    }

                                />
                                <br/><br/>
                                <RaisedButton
                                    backgroundColor={'#A71823'}
                                    labelColor={"white"}
                                    label="Login"
                                    labelPosition="before"
                                    //icon={<FontIcon className="fa fa-sign-out" />}
                                    type={"submit"}
                                    id={"bs"}

                                    // style={styles.raisedButton}
                                /> &nbsp; &nbsp;
                                <RaisedButton
                                    backgroundColor={'#A71823'}
                                    labelColor={"white"}
                                    label="Cancel"
                                    labelPosition="before"
                                    type={"reset"}
                                    id={"bc"}
                                    // style={styles.raisedButton}
                                />
                                <p>Not registered.<FlatButton label="Sign Up" id={'signin'}
                                                              labelStyle={{textTransform: 'capitalize'}}
                                                              onClick={this.signin} style={{color: '#A71823'}}/></p>
                            </MuiThemeProvider>
                        </form>

                    </div>
                    <div id={"content1"} align={'center'}>
                        <h3 style={{color: '#A71823', textAlign: 'center', fontSize: 25}}>Sign Up</h3>
                        <form id={"f12"} onSubmit={this.validateSign}>
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <TextField
                                    hintText="Enter your name"
                                    floatingLabelText="Name"
                                    floatingLabelFocusStyle={{color: '#A71823'}}
                                    underlineFocusStyle={{borderColor: '#A71823'}}
                                    type="text"
                                    id={"in1"}
                                />
                                <br/>
                                <TextField
                                    hintText="Enter your mobile number"
                                    floatingLabelText="Mobile"
                                    floatingLabelFocusStyle={{color: '#A71823'}}
                                    underlineFocusStyle={{borderColor: '#A71823'}}
                                    type="text"
                                    id={"im1"}
                                    maxLength="10"
                                />
                                <br/>
                                <TextField
                                    hintText="Enter your password"
                                    floatingLabelText="Password"
                                    floatingLabelFocusStyle={{color: '#A71823'}}
                                    underlineFocusStyle={{borderColor: '#A71823'}}
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    id={"ip1"}

                                />
                                <br/><br/>
                                <RaisedButton
                                    backgroundColor={'#A71823'}
                                    labelColor={"white"}
                                    label="Sign Up"
                                    labelPosition="before"
                                    //icon={<FontIcon className="fa fa-sign-out" />}
                                    id={"bs1"}
                                    type={'submit'}
                                    // style={styles.raisedButton}
                                /> &nbsp; &nbsp;
                                <RaisedButton
                                    backgroundColor={'#A71823'}
                                    labelColor={"white"}
                                    label="Cancel"
                                    labelPosition="before"
                                    type={"reset"}
                                    id={"bc1"}
                                    // style={styles.raisedButton}
                                />
                                <p>Alreacy registered?.<FlatButton label="Login" id={'login'}
                                                                   labelStyle={{textTransform: 'capitalize'}}
                                                                   onClick={this.loginin} style={{color: '#A71823'}}/>
                                </p>
                            </MuiThemeProvider>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

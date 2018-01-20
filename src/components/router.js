import React from 'react';
import {BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../index.css';
import Login from './login'
import App from './app'

const checkAuth=()=>{
    var user= localStorage.getItem("user");
    if(!user)
        return false;
    else
        return true;
}
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       checkAuth() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                 pathname: '/'
            }}/>
        )
    )}/>
)
const clear=()=>{
    localStorage.removeItem("user");
    return true;
}
const Root=({component:Component,...rest})=>(
    <Route {...rest} render={props =>(
        clear()?
        (<Component {...props}/>): null
    )}/>
)

export default class Routers extends React.Component {

    render() {

        return (
            <Router>
                <div>
                    <Root exact path="/"  component={Login}/>
                    <AuthRoute exact path="/content"  component={App}/>
                </div>
            </Router>
        )
    }
}

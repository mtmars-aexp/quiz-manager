import React from 'react';

class Login extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            username: "",
            password: ""
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    handleFormSubmit(event){
        event.preventDefault();
        this.props.handleLogin(this.state.username, this.state.password);
    }

    render(){
        return(
            <div className = "page">
                <h1>Please login.</h1>
                <form onSubmit = {this.handleFormSubmit}>
                    Username: <input type="text" onChange={this.handleUsernameChange}></input> <br/>
                    Password: <input type="password" onChange={this.handlePasswordChange}></input> <br/>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login
import React, {Component} from 'react';

class Error extends Component{
    render(){
        return(
            <div className = "page">
                <h1>Sorry. This page was not found. Click <a href="/">here</a> to go home.</h1>
            </div>
        )
    }
}

export default Error
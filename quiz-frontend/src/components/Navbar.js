import React from 'react';

class Navbar extends React.Component{

    render(){
        return(
            <div className = "navbar">
                <ul>
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/secret">Secret page</a></li>
                    <li><a href = "#" onClick = {this.props.handleLogout}>Logout</a></li>
                </ul>
            </div>
        );
    }

}

export default Navbar
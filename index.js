import React from 'react'; 
import ReactDOM from 'react-dom'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Employee from './Employee'
import Hobby1 from './Hobby1'
import './index.css';
// Message Component 
function Message(props) 
{    
	if (props.isLoggedIn) 
		return <h1></h1>; 
	else
		return <h1>Please Login</h1>; 
} 

// Login Component 
function Login(props) 
{ 
return( 
		<button onClick = {props.clickFunc}> 
			Login 
		</button> 
	); 
} 

// Logout Component 
function Logout(props) 
{ 
	return( 
		<button onClick = {props.clickFunc}> 
			Logout 
		</button> 
	); 
} 

// Parent Homepage Component 
class LoginPage extends React.Component{ 

	constructor(props) 
	{ 
		super(props);
			this.state = {
            username: '',
            password: '',
			error: '',
            }

		
		this.state = {isLoggedIn : false}; 
		this.ifLoginClicked = this.ifLoginClicked.bind(this); 
		this.ifLogoutClicked = this.ifLogoutClicked.bind(this); 
		this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
		this.dismissError = this.dismissError.bind(this);
        
       
	} 

	ifLoginClicked() 
	{ 
		if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'password is required' });
        }
        else
        {
            this.setState({isLoggedIn : true}); 
        }
	} 

	ifLogoutClicked() 
	{ 
		this.setState({isLoggedIn : false}); 
		this.setState({username : ''}); 
		this.setState({password : ''}); 
	} 
	
	dismissError() {
        this.setState({ error: '' });
    }
	
	handleUserChange(evt) {
        //alert("user")
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        //alert("pass")
        this.setState({
            password: evt.target.value,
        });
    }

	render(){ 

		return( 
			<div> 
				<Message isLoggedIn = {this.state.isLoggedIn}/> 
				{ 
					(this.state.isLoggedIn)?( 
					<div>
					<div class = "topright"><Logout clickFunc = {this.ifLogoutClicked} /> </div>
					<Employee username = {this.state.username}/> 
					</div>
					) : (
					<div>
					<label>User Name</label>
                    <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
					
					<div>	
					{this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
					}
					</div>
					<br/>
                    <label>Password    </label>
                    <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
					<br/>
					<Login clickFunc = {this.ifLoginClicked} /> 
					
					</div>
					) 
				} 

			</div> 
				
			); 
	} 
}


ReactDOM.render(< LoginPage/>, document.getElementById('root'));
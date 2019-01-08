
// Importing combination 
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Hobby1 from './Hobby1'
import './index.css';


class Employee extends React.Component {
    constructor(props) {
        super(props);
		 this.state={
			employee_id:'',
			employee_name:'',
			street:'',
			city:'',
			statename:'',
			zip:'',
			items: [],
			address:[],
			hobbies:[],
			isLoaded: false,
			isFindMode: false
		};
		
    }
	
	myCallbackEmployee = (dataFromHobby1) => {
        this.setState({ hobbies: dataFromHobby1 });
    }

	deleteData(event) {
	  fetch('http://104.248.219.208:8080/cts/employee?empId='+this.state.employee_id, {
		method: 'delete'
	  }).then(response =>
		response.json()
		.then(json => {
		  //return json;
		  this.setState({
						isLoaded: true,
						items: [],
						address:[],
					})
		
		})
	  );
	  alert("Deleted Successfully");
  
}
	
	
    
	handleFindEmployee(event){
		//var it =
		console.log("Hi am find");
		this.setState({isFindMode:true});
		//fetch('http://104.248.219.208:8080/cts/employee?empId='+this.state.employee_id, {
		fetch('http://104.248.219.208:8080/cts/employee?empId='+this.state.employee_id)
		   .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
					address:json.address,
					hobbies:json.hobbies,
                })
            });
    }
	
	handleSaveEmployee(evt) {
		console.log("Saving Employee");
		fetch('http://104.248.219.208:8080/cts/employee', {
			method: 'POST',
			body: JSON.stringify(
				{
				   "address": {
					"city": this.state.city,
					"state": this.state.statename,
					"street": this.state.street,
					"zip": this.state.zip
				  },
				  "firstName": this.state.employee_name,
				  "hobbies": this.state.hobbies,
				  "lastName": ""
				}
				
			),
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		}).then(function(response) {
			if(response.ok){
				return response.json();
			}{
				throw new Error("Post Failed")
			}
		}).then(function(responseBody){
			console.log(responseBody)
		})
		.catch(function(error) {
			console.log("Request failed", error);
		});
		console.log("Hello");
		alert("Details saved successfully");
    };
	
    render() {
		var { isLoaded, items, address } = this.state;
		console.log("Hobbies in Employee are: "+this.state.hobbies);
		console.log("items in Employee are: "+items);
		return (
          <div>
           <MuiThemeProvider>
		   <div class = "fontstyle">Hi {this.props.username}</div>
		   <div class = "centered">
		   <h8>Enter the Employee id if existing user</h8>
			   <TextField
				 hintText="1234"
				 floatingLabelText="Employee id"
				  onChange = {(event,newValue) => this.setState({employee_id:newValue})}
				 />
			   <RaisedButton label="Find" style={style} onClick={(event) => this.handleFindEmployee(event)}/>
			   <br/>
			   
			   <h9>Enter the Employee details if new user</h9>
			   <TextField 
				style = {{ height: 100}}
				 floatingLabelText="Employee Name"
				 value = {items.firstName}
				 ref="ename"
				 onChange = {(event,newValue) => this.setState({employee_name:newValue})}
				 />
			   <br/>
			   <div>
			   <h7>Enter the Address below</h7>
			   </div>
			   <div>
				   <TextField
				   style = {{ height: 100}}
					 floatingLabelText="Street"
					 onChange = {(event,newValue) => this.setState({street:newValue})}
					 value = {address.street}
					 />
				   <br/>
				   <TextField
					 style = {{ height: 100}}
					 floatingLabelText="City"
					 value = {address.city}
					 onChange = {(event,newValue) => this.setState({city:newValue})}
					 />
				   <br/>
				   <br/>
				   <TextField
					 style = {{ height: 100}}
					 floatingLabelText="State"
					 value = {address.state}
					 onChange = {(event,newValue) => this.setState({statename:newValue})}
					 />
				   <br/>
				   <br/>
				   <TextField
					 style = {{ height: 100}}
					 floatingLabelText="Zip"
					 value = {address.zip}
					 onChange = {(event,newValue) => this.setState({zip:newValue})}
					 />
				   <br/>
				   <Hobby1 callbackFromEmployee={this.myCallbackEmployee.bind(this)} findmode = {this.state.isFindMode} selectedValues={this.state.hobbies}/>
				   
				</div>
			   <RaisedButton label="Delete Employee" style={style} onClick={(event) => this.deleteData(event)}/>
			   <RaisedButton label="Save Employee" style={style} onClick={(event) => this.handleSaveEmployee(event)}/>
			 
			    
			   </div>
			   
          </MuiThemeProvider>
		  </div>
      
    );
  }
}
const style = {
  margin: 15,
};

export default Employee;
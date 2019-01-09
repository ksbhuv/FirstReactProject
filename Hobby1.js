import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import './index.css';


class HobbyList extends React.Component {
  constructor(props){
    super(props);
	this.state = {
		options: [],
		hobbyvalue:"",
		editabletext:""
		}
		this.ifCheckBoxClicked = this.ifCheckBoxClicked.bind(this); 
		
  }
  
  handleEdit(index,e)
  {
	  console.log("edit index"+index);
	  this.setState({editabletext:e.target.value});
	  this.props.options[index] = this.state.editabletext;
  }
  
  ifCheckBoxClicked(e)
  {
	const options = this.state.options
	let index
	if (e.target.checked) {
	  console.log("checked")
	  console.log(e.target.value)
	  options.push(e.target.value)
	} else {
	  console.log("unchecked")
	  index = options.indexOf(e.target.value)
	  options.splice(index, 1)
	}
	this.setState({ options: options });
	console.log("Options selected from Hobby List are:=>" +options);
	this.props.callbackFromHobby(options);
	
  }

  render(){
	
		
		for (var i = 0; i < this.props.options.length; i++) {    
		   console.log("option:=>" + this.props.options[i]);  
		}
        const renderCommpos = this.props.options.map((Elem, index) => {
            return (
			<div>
			{
				(this.props.editmode)?
				(
					
					<div>
					<label>
						<input type="checkbox" name={this.props.options[index]} value = {this.props.options[index]} onChange={this.ifCheckBoxClicked}/>
						<input type = "text" value = {this.props.options[index]} onChange={this.handleEdit.bind(this,index)}/>
					</label>
					<br/>
					</div>
				):
				(
					
					<div>
					<label>
						<input type="checkbox" name={this.props.options[index]} value = {this.props.options[index]} onChange={this.ifCheckBoxClicked}/>
						{this.props.options[index]}
					</label>
					<br/>
					</div>
				)
				
			}
			</div>
			
			);
        });

        return (
            <div>
                {renderCommpos}
            </div>
			);
  }
} 

class Hobby1 extends React.Component {
    constructor(props) {
        super(props);
		 this.state={
			 newHobby : "",
			 items:[],
			 selectedhobbies:[],
			 editmode:false,
			
		};
		
    }
	myCallbackHob = (dataFromHobbyList) => {
        this.setState({selectedhobbies: dataFromHobbyList });
		console.log("Selected List of Hobbies Received :=> "+this.state.selectedhobbies);
		this.props.callbackFromEmployee(this.state.selectedhobbies);
    }
	
	
	edithobby(event)
	{
		console.log("In Edit mode...");
		this.setState({editmode:true})
	};
	deletehobby(event)
	{
		const selectedhobbies = this.state.selectedhobbies
		const items = this.state.items
		console.log("Selected hobbies total :>"+selectedhobbies)
		let index
		let item_index
		for (var i = 0; i < selectedhobbies.length; i++) {    
		   console.log("deleting:" + selectedhobbies[i]); 
		   index = selectedhobbies.indexOf(selectedhobbies[i])	;
		   item_index = items.indexOf(selectedhobbies[i]);
		   selectedhobbies.splice(index, 1);
		   items.splice(item_index, 1);
		}
		console.log("selected hobbies remaining :>"+selectedhobbies)
		this.setState({ items: items });
		this.setState({ selectedhobbies: selectedhobbies });
		console.log("Hobbies displayed on screen after deletion:=>"+this.state.items)
		alert("Hobby deleted successfully");
	};
	
	addhobby(event)
	{
		const items = this.state.items
		items.push(this.state.newHobby)
		this.setState({ items: items })
		console.log("add hobby:=>"+items)
		alert("Hobby added successfully");
	};
	 render() {
			console.log("Got Hobbies from Employee:"+this.props.selectedValues)
			return (
			  <div class = "dottedborder">
			   <MuiThemeProvider>
				   <div>
				   <div class="fontstyle">
					   <TextField
					    style = {{ height: 100}}
						 floatingLabelText="Enter Your Hobbies"
						 onChange = {(event,newValue) => this.setState({newHobby:newValue})}
						 //value = {address.street}
						 />
					   
					   
				   <RaisedButton label="Add Hobby" style={style} onClick={(event) => this.addhobby(event)}/>
				   </div>
				   <RaisedButton label="Delete Hobby" style={style} onClick={(event) => this.deletehobby(event)}/>
				   <RaisedButton label="Edit Hobby" style={style} onClick={(event) => this.edithobby(event)}/>
				   
				   </div>
				   {
					   (this.props.findmode)?
						(<div><HobbyList callbackFromHobby = {this.myCallbackHob.bind(this)} options = {this.props.selectedValues}/></div>)
						:
						(<div><HobbyList callbackFromHobby = {this.myCallbackHob.bind(this)} options = {this.state.items} editmode = {this.state.editmode}/></div>)
				   }
				   
				   
			  </MuiThemeProvider>
			  </div>
      
			);
		
	}
}
const style = {
  margin: 15,
};

export default Hobby1;
import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Create extends Component
{
	constructor() {
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors    : [],
			firstname :'',
			lastname  : '',
			email 	  : '',
			mobile_no : '',
			password  :'',
			conformpassword :''
			
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertUser = this.handleInsertUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	/*handleInputConPasswordChange(e) {
		
		var error = {};
		if(e.target.value!= this.state.password){ //password
			error.conformpassword = ['This field is required!'];
		}
		
		this.setState({
			[e.target.name] : e.target.value
		})


	}*/
	//--- Insert new user in users state array by props method ---//
	handleInsertUser(e) {
		e.preventDefault()
		const data = {
			id 		  : Math.floor(Math.random() * 100),
			firstname  : this.state.firstname,
			lastname   : this.state.lastname,
			email     : this.state.email,
			mobile_no : this.state.mobile_no,
			password     : this.state.password,
			conformpassword  : this.state.conformpassword
		
		}
		if( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 0);
			document.getElementById("closeAddModal").click();
			toastr.success('New user added successfully!', {position : 'top-right', heading: 'Done'});
		}
	}
	//--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.firstname.length === 0) {
    		error.firstname = ['Please Enter the FirstName'];
    	}
		if(fields.lastname.length === 0) {
    		error.lastname  = ['Please Enter the LastName'];
    	}
    	if(fields.email.length === 0) {
    		error.email = ['Please Enter the Email'];
		}
		if(fields.mobile_no.length === 0) {
    		error.mobile_no = ['Please Enter the MobileNumber'];
		}
		if(fields.password.length === 0) {
			error.password = ['Please Enter the Password'];
		}
		if(fields.conformpassword.length === 0) {
		    error.conformpassword = ['Please Enter the Password'];
		
    	}
		
	    
		this.setState({
			errors : error
		})
		if(fields.firstname.length === 0 || fields.lastname.length === 0 || fields.email.length === 0 || fields.mobile_no.length === 0|| fields.password.length === 0  || fields.conformpassword.length === 0  ) {
			return true;
		} else {
			return false;
		}
    }
    //--- Reset all state variable while insert new user ---//
    reset() {
        this.setState(this.baseState);
    }
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">New user</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleInsertUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="firstname" className="col-form-label">First name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('firstname') ? 'is-invalid' : ''}`}
			            		 id="firstname" name="firstname" placeholder="First name" onChange={this.handleInputFieldChange} value={this.state.firstname}/>
			            		{this.renderErrorFor('firstname')}
			         	 	</div>
							  <div className="form-group">
			            		<label htmlFor="lastname" className="col-form-label">Last name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('lastname') ? 'is-invalid' : ''}`}
			            		 id="lastname" name="lastname" placeholder="Last name" onChange={this.handleInputFieldChange} value={this.state.lastname}/>
			            		{this.renderErrorFor('lastname')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="email" className="col-form-label">Email:</label>
			            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
			            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
			            		{this.renderErrorFor('email')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="mobile_no" className="col-form-label">Mobile No:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('mobile_no') ? 'is-invalid' : ''}`}
			            		 id="mobile_no" name="mobile_no" placeholder="Mobile no" onChange={this.handleInputFieldChange} value={this.state.mobile_no}/>
			            		{this.renderErrorFor('mobile_no')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="password" className="col-form-label">Password:</label>
			            		<input type="password" className={`form-control form-control-sm ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
			            		 id="password" name="password" placeholder="Password" onChange={this.handleInputFieldChange} value={this.state.password}/>
			            		{this.renderErrorFor('password')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="conformpassword" className="col-form-label">ConformPassword:</label>
			            		<input type="password" className={`form-control form-control-sm ${this.hasErrorFor('conformpassword') ? 'is-invalid' : ''}`}
			            		 id="conformpassword" name="conformpassword" placeholder="conformpassword"  onChange={this.handleInputFieldChange} value={this.state.conformpassword}/>
			            		{this.renderErrorFor('conformpassword')}
			          		</div>
							  </div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save User</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Create ;
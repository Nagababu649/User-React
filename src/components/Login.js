import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Index from './Index'
import  { Redirect,Route } from 'react-router-dom'
import Registration from './Registration'


class Login extends Component
{
	constructor() {
        console.log('constructor: ');
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors    : [],
			email     : '',
			password  :'',
            users     : [
				{id : 11, username : "Moazzam Hossain", mobile_no : "88018 29887799", password : 1234 , email : "moazzam@gmail.com",  qualification : "Mtech" },
				{id : 22, username : "Azim Uddin", mobile_no : "88017 23665544",  password : 12344 , email : "azim@gmail.com", qualification : "Msc"},
				{id : 33, username : "Sojol Kaisar", mobile_no : "88016 26332211",  password : 12345 , email : "sojol@gmail.com",  qualification : "MCA" }
			]
	}

        
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleRegisterUser = this.handleRegisterUser.bind(this);
		this.handleLoginUser = this.handleLoginUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
    handleRegisterUser(e) {
		e.preventDefault()
		const data = {
			id 		  : Math.floor(Math.random() * 100),
			firstname  : this.state.fristname,
			lastname   : this.state.lastname,
			email     : this.state.email,
			mobile_no : this.state.mobile_no,
			password     : this.state.password,
			conformpassword  : this.state.conformpassword		
		}
    }
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

    componentDidMount() {
        // Typical usage (don't forget to compare props):
        const userdata = JSON.stringify(this.state.users);

        localStorage.setItem('AllUsersData', userdata);
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
	handleLoginUser(e) {
		e.preventDefault()
		const data = {
			id 		  : Math.floor(Math.random() * 100),
			email  : this.state.email,
			password     : this.state.password			
		}
		if( !this.checkValidation(data) ) {
			this.reset();


			//this.props.updateState(data, 0);
			//document.getElementById("closeAddModal").click();
			toastr.success('User login successfully!', {position : 'top-right', heading: 'Done'});

            //this.props.history.push('/in')

            //return  <Index/>
            //return  <Route path='/index' component={Index} exact/>

            this.props.history.push('/index')

              
		}
	}
	//--- Validate all input field ---//
    checkValidation(fields) {
    	var error = {};
    	if(fields.email.length === 0) {
    		error.email = ['Please Enter the Email'];
    	}
		if(fields.password.length === 0) {
			error.password = ['Please Enter the Password'];
		}
		
		this.setState({
			errors : error
		})
		if(fields.email.length === 0 ||  fields.password.length === 0 ) {
			return true;
		} else {
            let getUser =  JSON.parse(localStorage.getItem('AllUsersData')); 

            var email_status = getUser.some(function(el) { 
            return (el.email == fields.email);
            });

            var password_status = getUser.some(function(el) { 
            return (el.password == fields.password);
            });
            console.log(password_status);

            if(email_status == true && password_status == true) {
                alert("Success");
            } else {
                alert("Fail");
                return true;
            }
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

	routeChange=()=> {
		this.props.history.push('/signup')
	}

    render() {

        console.log('Login:');

      return(
			<div className="login" id="loginModal" tabIndex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Login</h5>
							<button type="button" onClick={this.routeChange} className="btn btn-primary btn-sm pull-right"  data-toggle="modal" data-target="#addModal"> Registration
						
 							</button>

			        		{/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button> */}
			      		</div>
			        <form onSubmit={this.handleLoginUser}>
			      		<div className="modal-body">
                          <div className="form-group">
			            		<label htmlFor="email" className="col-form-label">Email:</label>
			            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
			            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
			            		{this.renderErrorFor('email')}
			          		</div>
							  <div className="form-group">
			            		<label htmlFor="password" className="col-form-label">Password:</label>
			            		<input type="password" className={`form-control form-control-sm ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
			            		 id="password" name="password" placeholder="Password" onChange={this.handleInputFieldChange} value={this.state.password}/>
			            		{this.renderErrorFor('password')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">	
			        		<button type="submit" className="btn btn-primary btn-sm">Login</button>
                            {/* <button type="button" className="btn btn-primary btn-sm pull-right" onClick={this.handleRegisterUser.bind(this)} data-toggle="modal" data-target="#addModal"> Register </button> */}
                            {/* <button type="submit" className="btn btn-primary btn-sm">Register</button> */}
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Login;
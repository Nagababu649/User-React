import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
//import Index from './components/Index'
import Registration from './components/Registration'
import Login from './components/Login'
import Index from './components/Index'


class App extends Component
{
    render() {
        return(
          <Router>
            <div className="container">
              
                 <Header/>
              
               


              <Switch>
                <Route path='/index' component={Index} exact/>  
                <Route path='/' component={Login} exact/>
                 <Route path='/signup' component={Registration} exact/> 
              </Switch>
            </div>
          </Router>
        )
    }
}
export default App 
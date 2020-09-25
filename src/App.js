import React from 'react'
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {startUserLogout} from './actions/userAction'
import swal from 'sweetalert'
import {PrivateRoute} from './helpers/privateRoute'

import Home from './components/static/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/auth/Dashboard'
import Account from './components/auth/Account'

import Customers from './components/Customers/Customers'
import AddCustomer from './components/Customers/AddCustomer'
import CustomerShow from './components/Customers/CustomerShow'
import EditCustomer from './components/Customers/EditCustomer'

import Departments from './components/Departments/Departments'
import AddDepartment from './components/Departments/AddDepartment'
import DepartmentShow from './components/Departments/DepartmentShow'
import EditDepartment from './components/Departments/EditDepartment'

import Employees from './components/Employees/Employees'
import AddEmployee from './components/Employees/AddEmployee'
import EmployeeShow from './components/Employees/EmployeeShow'
import EditEmployee from './components/Employees/EditEmployee'

import Tickets from './components/Tickets/Tickets'
import AddTicket from './components/Tickets/AddTicket'
import TicketShow from './components/Tickets/TicketShow'
import EditTicket from './components/Tickets/EditTicket'

 function App(props){
    const handleLogout=()=>{
        swal({
            title:'are you sure u want to logout',
            icon:'warning',
            buttons:true,
            dangerMode:true
        })
        .then((willDelete)=>{
            if(willDelete){
             props.dispatch(startUserLogout()) 
         }
        })
       
    }
    return(
        <Router>
            <div>
                {Object.keys(props.user).length==0 ?(
                        <div>
                            <nav className="navbar navbar-expand-sm bg-light">
                                <a className="navbar-brand">ticket master</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className=" ml-auto navbar-nav">
                                        <li className="nav-item">
                                            <span className="nav-link"><Link to='/'>Home</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"> <Link to='/users/login'>Login</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"> <Link to='/users/register'>Register</Link></span>
                                        </li>
                                    </ul>
                                </div>
                            </nav> 
                        </div>
                      ):(
                        <div>
                             <nav className="navbar navbar-expand-sm bg-light">
                                <a className="navbar-brand">ticket master</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className=" ml-auto navbar-nav">
                                        <li className="nav-item">
                                            <span className="nav-link"><Link to='/'>Home</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"><Link to='/account'>Account</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"><Link to='/dashboard'>Dashboard</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"> <Link to='/customers'>Customers</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"> <Link to='/departments'>Departments</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link"> <Link to='/employees'>Employees</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link">  <Link to='/tickets'>Tickets</Link></span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link">  <Link to='#' onClick={handleLogout} >Logout</Link></span>
                                        </li>
                                    </ul>
                                </div>

                            </nav>
                            
                        </div>
                      )
                } 
                <Switch>
                    <Route path='/' component={Home} exact={true}/>

                    <Route path='/users/login' component={Login}/>
                    <Route path='/users/register' component={Register}/>
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <PrivateRoute path='/account' component={Account}/>

                    <PrivateRoute path='/customers' component={Customers} exact={true}/>
                    <PrivateRoute path='/customers/new' component={AddCustomer}/>
                    <PrivateRoute path='/customers/:id' component={CustomerShow} exact={true}/>
                    <PrivateRoute path='/customers/edit/:id' component={EditCustomer}/>

                    <PrivateRoute path='/departments' component={Departments} exact={true}/>
                    <PrivateRoute path='/departments/new' component={AddDepartment}/>
                    <PrivateRoute path='/departments/:id' component={DepartmentShow} exact={true}/>
                    <PrivateRoute path='/departments/edit/:id' component={EditDepartment}/>

                    <PrivateRoute path='/employees' component={Employees} exact={true}/>
                    <PrivateRoute path='/employees/new' component={AddEmployee}/>
                    <PrivateRoute path='/employees/:id' component={EmployeeShow} exact={true}/>
                    <PrivateRoute path='/employees/edit/:id' component={EditEmployee}/>
                    
                    <PrivateRoute path='/tickets' component={Tickets} exact={true}/>
                    <PrivateRoute path='/tickets/new' component={AddTicket}/>
                    <PrivateRoute path='/tickets/:id' component={TicketShow} exact={true}/>
                    <PrivateRoute path='/tickets/edit/:id' component={EditTicket}/>
                    <PrivateRoute render={
                        ()=><h1>error found</h1>
                    }/>
                </Switch>
            </div>
        </Router>
    )
    
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(App)
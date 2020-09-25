import React from 'react'
import {Nav,Tab,Card} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import { ticketStatusChange } from '../../actions/ticketsAction'
import {findCustomerNameTickets,findDepartmentNameTickets} from '../../selectors/selector'
import { findCustomerOnId } from '../../selectors/CustomerSelector'
import { findDepartmentOnId } from '../../selectors/DepartmentSelector'
import {showEmployee} from '../../selectors/EmployeeSelector'
class EmployeeTabs extends React.Component{
    constructor(){
        super()
        this.state={
            status:'all'
        }
    }

    handleStatus=(status)=>{
        this.setState({
            status
        })
    }
 
    render(){
        return(
            <div>
                <React.Fragment>
                    <Nav tabs role="tablist">
                    <Nav.ItemLink active href="#all" id="all-tab" data-toggle="tab" aria-selected="true" onClick={()=>{this.handleStatus('all')}}>
                    all
                    </Nav.ItemLink>
                    <Nav.ItemLink  href="#pending" id="pending-tab" data-toggle="tab" aria-selected="false" onClick={()=>{this.handleStatus('pending')}}>
                    Pending
                    </Nav.ItemLink>
                    <Nav.ItemLink href="#completed" id="completed-tab" data-toggle="tab" aria-selected="false"  onClick={()=>{this.handleStatus('completed')}}>
                    Completed
                    </Nav.ItemLink>
                    </Nav>
                    <Tab.Content>
                    <Tab.Pane id="all" aria-labelledby="all-tab" show active>
                        all tickets
                    </Tab.Pane>
                    <Tab.Pane id="pending" aria-labelledby="pending-tab" >
                        pending tickets
                    </Tab.Pane>
                    <Tab.Pane id="completed" aria-labelledby="completed-tab">
                            completed tickets
                    </Tab.Pane>
                    </Tab.Content>
                </React.Fragment>
           {
               this.state.status=='all'&&
               this.props.allTickets.map(tick=>{
                   const cust=findCustomerOnId(this.props.customers,tick.customer)
                   const dept=findDepartmentOnId(this.props.departments,tick.department)
                   return (
                   <div key={tick._id}>
                       <Card id='animation' bg='info' >
                       <p>code-{tick.code}</p>
                       <p>customer-{cust && cust.name}</p>
                        <p>department-{dept && dept.name}</p>
                        <p>employees-{showEmployee(this.props.employees,tick.employees)}</p>
                        <p>message-{tick.message}</p>
                        <p>priority-{tick.priority}</p>
                        </Card>
                    </div>
                   )
               })
           }
             {
               this.state.status=='pending'&&
               this.props.pendingTickets.map(tick=>{
                const cust=findCustomerOnId(this.props.customers,tick.customer)
                const dept=findDepartmentOnId(this.props.departments,tick.department)
                   return (
                   <div key={tick._id}>
                       <Card id='animation' bg='warning' >
                       <p>code-{tick.code}</p>
                       <p>customer-{cust && cust.name}</p>
                        <p>department-{dept && dept.name}</p>
                        <p>employees-{showEmployee(this.props.employees,tick.employees)}</p>
                        <p>message-{tick.message}</p>
                        <p>priority-{tick.priority}</p>
                        </Card>
                    </div>
                   )
               })
           }
             {
               this.state.status=='completed'&&
               this.props.completedTickets.map(tick=>{
                const cust=findCustomerOnId(this.props.customers,tick.customer)
                const dept=findDepartmentOnId(this.props.departments,tick.department)
                   return (
                   <div key={tick._id}>
                       <Card id='animation' bg='success'>
                       <p>code-{tick.code}</p>
                       <p>customer-{cust && cust.name}</p>
                        <p>department-{dept && dept.name}</p>
                        <p>employees-{showEmployee(this.props.employees,tick.employees)}</p>
                        <p>message-{tick.message}</p>
                        <p>priority-{tick.priority}</p>
                        </Card>
                    </div>
                   )
               })
           }
            </div>
        )
    }
}

EmployeeTabs.propTypes={
    pendingTickets:propTypes.array.isRequired,
    allTickets:propTypes.array.isRequired,
    completedTickets:propTypes.array.isRequired
}

const mapStateToProps=(state)=>{
    return {
        customers:state.customers,
        employees:state.employees,
        departments:state.departments
    }
}

export default connect(mapStateToProps)(EmployeeTabs)
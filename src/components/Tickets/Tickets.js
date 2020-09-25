import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startGetTickets, removeStatusTicket} from '../../actions/ticketsAction'
import {startRemoveTicket} from '../../actions/ticketsAction'
import {ticketStatusChange} from '../../actions/ticketsAction'
import {Nav,Tab,Button,Container,Row,Col} from 'bootstrap-4-react'
import TicketItem from './TicketItem'
import TicketItemComplete from './TicketItemComplete'
import TicketCharts from './TicketCharts'
import {pendingTickets,completedTickets} from '../../selectors/TicketSelector'
import { findCustomerOnId } from '../../selectors/CustomerSelector'
import { findDepartmentOnId } from '../../selectors/DepartmentSelector'
import {showEmployee} from '../../selectors/EmployeeSelector'
class Tickets extends React.Component{
    constructor(){
        super()
        this.state={
            status:'pending',
            code:''
        }
    }
    /*componentDidMount(){
        if(this.props.tickets.length==0){
            this.props.dispatch(startGetTickets())
        }
    }*/
    handleStatus=(status)=>{
      this.setState({
          status
      })
    }

    handleChange=(id)=>{
        const data={
            isResolved:true
        }
        this.props.dispatch(ticketStatusChange(data,id))
    }

    handleCompleteChange=(id)=>{
        const data={
            isResolved:false
        }
        this.props.dispatch(ticketStatusChange(data,id))
    }

    handleCodeChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        const tick=pendingTickets(this.props.tickets)
        console.log('pending',tick)
        const tick1=completedTickets(this.props.tickets)
        console.log('completed',tick1)

        return(
            <Container>
            <div style={{margin:'20px 0 8px'}}>
                <Row>
                    <Col col='col-lg-8 sm-7 12'>
                        <React.Fragment>
                            <Nav tabs role="tablist">
                            <Nav.ItemLink active href="#pending" id="pending-tab" data-toggle="tab" aria-selected="true" onClick={()=>{this.handleStatus('pending')}}>
                            Pending
                            </Nav.ItemLink>
                            <Nav.ItemLink href="#completed" id="completed-tab" data-toggle="tab" aria-selected="false"  onClick={()=>{this.handleStatus('completed')}}>
                            Completed
                            </Nav.ItemLink>
                            </Nav>
                            <Tab.Content>
                            <Tab.Pane id="pending" aria-labelledby="pending-tab" show active>
                                pending tickets
                            </Tab.Pane>
                            <Tab.Pane id="completed" aria-labelledby="completed-tab">
                                    completed tickets
                            </Tab.Pane>
                            </Tab.Content>
                        </React.Fragment>
                    </Col>
                    <Col col='col-lg-4 sm-5 12' style={{verticalAlign:'middle',padding:'18px'}}>
                        <input type='text' className='style-input' value={this.state.code} onChange={this.handleCodeChange}  name='code' placeholder='enter code'/>
                    </Col>
                </Row>
                
                <div>
                    <h1 style={{marginTop:'12px'}}>Tickets-{this.state.status==='pending' ?tick.length:tick1.length}</h1>
                        <div className='table-responsive'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Code No</th>
                                        <th>Customer</th>
                                        <th>Department</th>
                                        <th>Employee</th>
                                        <th>Message</th>
                                        <th>Priority</th>
                                        <th>Actions</th>
                                        <th>Remove</th>
                                        <th>Complete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.status==='pending' ?
                                    tick.filter(tick=>tick.code.includes(this.state.code)).map(tick=>{
                                        console.log('emp',tick.employees)
                                    const cust=findCustomerOnId(this.props.customers,tick.customer)
                                    const dept=findDepartmentOnId(this.props.departments,tick.department)
                                    //const tickIds=tick.employees.map(tick=>tick.employee)
                                    return <TicketItem key={tick._id} id={tick._id} code={tick.code} customer={cust && cust.name} department={dept && dept.name} employees={showEmployee(this.props.employees,tick.employees).join(',')} message={tick.message} priority={tick.priority} isResolved={tick.isResolved} handleChange={this.handleChange}/>
                                }):
                                tick1.filter(tick=>tick.code.includes(this.state.code)).map(tick=>{
                                    console.log('emp',tick.employees)
                                const cust=findCustomerOnId(this.props.customers,tick.customer)
                                const dept=findDepartmentOnId(this.props.departments,tick.department)
                                //const tickIds=tick.employees.map(tick=>tick.employee)
                            return <TicketItemComplete key={tick._id} id={tick._id} code={tick.code} customer={cust && cust.name} department={dept && dept.name} employees={showEmployee(this.props.employees,tick.employees).join(',')} message={tick.message} priority={tick.priority} isResolved={tick.isResolved} handleChange={this.handleCompleteChange}/>
                                })
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                    
                  
                 <p><Link to='/tickets/new'>Add Ticket</Link></p>
                
                 <TicketCharts pendingTickets={tick} completedTickets={tick1}/>
            </div>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        tickets:state.tickets,
        customers:state.customers,
        employees:state.employees,
        departments:state.departments
    }
}

export default connect(mapStateToProps)(Tickets)
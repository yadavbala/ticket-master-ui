import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container,Card} from 'bootstrap-4-react'
import { findCustomerOnId } from '../../selectors/CustomerSelector'
import { findDepartmentOnId } from '../../selectors/DepartmentSelector'
import {findTicket} from '../../selectors/TicketSelector'
import {showEmployee} from '../../selectors/EmployeeSelector'
function TicketShow(props){
    const cust=props.ticket && findCustomerOnId(props.customers,props.ticket.customer)
    const dept=props.ticket && findDepartmentOnId(props.departments,props.ticket.department)
    return(
        <Container>
        <div>
                <div style={{marginTop:'30px'}}>
                    <Card id='ticket-show'>
                        <h5>codenumber-{props.ticket &&  props.ticket.code}</h5>
                        <p>customer-{cust && cust.name}</p>
                        <p>department-{dept && dept.name}</p>
                        <p>employees-{props.ticket && showEmployee(props.employees,props.ticket.employees).join(',')}</p>
                        <p>message-{props.ticket && props.ticket.message}</p>
                        <p>priority-{props.ticket && props.ticket.priority}</p>
                    </Card>
                 </div>
            
              
                <p className='back-link'><Link to='/tickets'>Back to Tickets</Link></p>
                <h4 style={{marginTop:'30px'}}><Link to={`/tickets/edit/${props.ticket && props.ticket._id}`}>Edit</Link></h4>
        </div>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    return{
        ticket:findTicket(state.tickets,props.match.params.id),
        customers:state.customers,
        departments:state.departments,
        employees:state.employees
    }
}

export default connect(mapStateToProps)(TicketShow)
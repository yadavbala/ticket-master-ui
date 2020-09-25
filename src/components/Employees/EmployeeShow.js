import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container,Nav} from 'bootstrap-4-react'
import EmployeeTabs from './EmployeeTabs'
import {findEmployee} from '../../selectors/EmployeeSelector'
import {allTicketsOnEmployee,pendingTicketsOnEmployee,completedTicketsOnEmployee} from '../../selectors/TicketSelector'
function EmployeeShow(props){
   
    return(
        <Container>
            <div> 
                {
                    props.employee&&
                <h1 style={{marginTop:'30px'}}>{props.employee.name}-{props.employee.email}</h1>
                }
                <p style={{fontSize:'20px',fontWeight:400}}><Link to={`/employees/edit/${props.employee && props.employee._id}`}>Edit</Link></p>
                <p className='back-link'><Link to='/employees'>Back to Employees</Link></p>
                <EmployeeTabs employee={props.employee} tickets={props.tickets} allTickets={props.allTicketsonEmployee} pendingTickets={props.pendingTicketsonEmployee} completedTickets={props.completedTicketsonEmployee}/>
            </div>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        employee:findEmployee(state.employees,props.match.params.id),
        tickets:state.tickets,
        allTicketsonEmployee:allTicketsOnEmployee(state.tickets,id),
        pendingTicketsonEmployee:pendingTicketsOnEmployee(state.tickets,id),
        completedTicketsonEmployee:completedTicketsOnEmployee(state.tickets,id)

    }
}

export default connect(mapStateToProps)(EmployeeShow)
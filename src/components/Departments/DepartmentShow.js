import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container,Nav} from 'bootstrap-4-react'
import DepartmentTabs from './DepartmentTabs'
import {findDepartment} from '../../selectors/DepartmentSelector'
import {allTicketsOnDepartment,pendingTicketsOnDepartment,completedTicketsOnDepartment} from '../../selectors/TicketSelector'
function DepartmentShow(props){
    return(
        <Container>
           <div>
            {
                props.department&&
                <h1 style={{marginTop:'30px'}}>name-{props.department.name}</h1>
            }
            <p style={{fontSize:'20px',fontWeight:400}}><Link to={`/departments/edit/${props.department && props.department._id}`}>Edit</Link></p>
            <p className='back-link'><Link to='/departments'>Back to Departments</Link></p>
            <DepartmentTabs department={props.department} tickets={props.tickets} allTickets={props.allTicketsOnDepartment} pendingTickets={props.pendingTicketsOnDepartment} completedTickets={props.completedTicketsOnDepartment}/>
        </div>
       
        </Container>
       
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        department:findDepartment(state.departments,id),
        tickets:state.tickets,
        allTicketsOnDepartment:allTicketsOnDepartment(state.tickets,id),
        pendingTicketsOnDepartment:pendingTicketsOnDepartment(state.tickets,id),
        completedTicketsOnDepartment:completedTicketsOnDepartment(state.tickets,id)

    }
}

export default connect(mapStateToProps)(DepartmentShow)
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container,Nav,Tab} from 'bootstrap-4-react'
import CustomerTabs from './CustomerTabs'
import {findCustomer} from '../../selectors/CustomerSelector'
import {allTicketsOnCustomer,pendingTicketsOnCustomer,completedTicketsOnCustomer} from '../../selectors/TicketSelector'
function CustomerShow(props){
    return(
        <Container>
        <div>
               
            <h1 style={{marginTop:'30px'}}>{props.customer?.name}-{props.customer?.email}</h1>
            <p style={{fontSize:'20px',fontWeight:400}}><Link to={`/customers/edit/${props.customer?._id}`}>EDIT</Link></p>
            <p className='back-link'><Link to='/customers'>Back to Customers</Link></p>
           <CustomerTabs customer={props.customer} tickets={props.tickets} allTickets={props.allTicketsOnCustomer} pendingTickets={props.pendingTicketsOnCustomer} completedTickets={props.completedTicketsOnCustomer}/>
        </div>
       
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        customer:findCustomer(state.customers,id),
        tickets:state.tickets,
        customers:state.customers,
        allTicketsOnCustomer:allTicketsOnCustomer(state.tickets,id),
        pendingTicketsOnCustomer:pendingTicketsOnCustomer(state.tickets,id),
        completedTicketsOnCustomer:completedTicketsOnCustomer(state.tickets,id)
    }
}

export default connect(mapStateToProps)(CustomerShow)
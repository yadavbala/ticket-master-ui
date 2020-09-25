import React from 'react'
import TicketForm from './Form'
import {Container} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import {findTicket} from '../../selectors/TicketSelector'
function EditTicket(props){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Add Ticket</h1>
                {props.ticket?<TicketForm ticket={props.ticket}/>:'loading...'}
            </React.Fragment>
        </Container>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        ticket:findTicket(state.tickets,id)
    }
}

export default connect(mapStateToProps)(EditTicket)
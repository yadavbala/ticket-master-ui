import React from 'react'
import {Container} from 'bootstrap-4-react'
import TicketForm from './Form'
function AddTicket(){
    return(
        <Container>
            <React.Fragment>
                <h1 style={{marginBottom:'40px'}}>Add Ticket</h1>
                <TicketForm/>
            </React.Fragment>
        </Container>
    )
}

export default AddTicket
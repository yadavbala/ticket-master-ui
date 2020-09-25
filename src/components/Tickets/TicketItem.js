import React from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {startRemoveTicket} from '../../actions/ticketsAction'
import {Button} from 'bootstrap-4-react'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import { BsTrash} from "react-icons/bs";
class TicketItem extends React.Component{
    handleRemove=(id)=>{
        swal({
            title:'are you sure u want to delete',
            icon:'warning',
            buttons:true,
            dangerMode:true
        })
        .then((willDelete)=>{
            if(willDelete){
            
             swal('successfully deleted',{
                 icon:'success'
             })
             this.props.dispatch(startRemoveTicket(id))
             
         }
        })
    }
    render(){
        console.log('props',this.props)
        return(
            !this.props.isResolved && (
                
                            <tr key={this.props.id}>
                                <td>{this.props.code}</td>
                                <td>{this.props.customer}</td>
                                <td>{this.props.department}</td>
                                <td>{this.props.employees && this.props.employees}</td>
                                <td>{this.props.message}</td>
                                <td>{this.props.priority}</td>
                                <td><Link to={`/tickets/${this.props.id}`}><Button primary>show</Button></Link></td>
                                <td><Button danger onClick={()=>{
                                   this.handleRemove(this.props.id)
                                }}><BsTrash/></Button></td>
                                <td><input type='checkbox' checked={this.props.isResolved} onChange={()=>{
                                    this.props.handleChange(this.props.id)
                                }}/></td>
                            </tr>          
           
            )
        )
    }
}

TicketItem.propTypes={
    id:propTypes.number.isRequired,
    code:propTypes.number.isRequired,
    customer:propTypes.number.isRequired,
    employees:propTypes.string.isRequired,
    message:propTypes.string.isRequired,
    priority:propTypes.bool.isRequired
}

export default connect()(TicketItem)
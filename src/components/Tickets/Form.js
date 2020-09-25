import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import {startPostTicket, startEditTicket} from '../../actions/ticketsAction'
import {Container,Row,Col,Button,Card,Alert} from 'bootstrap-4-react'
import {findCustomerTicket,findDeptTicket,findDeptName} from '../../selectors/selector'
import {filterEmployeesOnDepartment} from '../../selectors/EmployeeSelector'
class TicketForm extends React.Component{
     constructor(props){
         super(props)
         this.multiselectRef = React.createRef();
         this.state={
             code:props.ticket ? props.ticket.code:'',
             customer:props.ticket ? props.ticket.customer:'',
             department:props.ticket ? props.ticket.department:'',
             employees:props.ticket ? props.ticket.employees:"",
             message:props.ticket ? props.ticket.message:'',
             priority:props.ticket ? props.ticket.priority :'',
             success:'',
             priorities:['High','Medium','Low']
         }
     }
   
     handleSubmit=(e)=>{
        e.preventDefault()
       const {code,customer,department,employees,message,priority}=this.state
       const formData={code,customer,department,employees,message,priority}
        console.log(formData)
        const success=()=>{
            this.setState({success:this.props.ticket?'ticket details edited successfully':"ticket details submitted successfully"})
        }
        const redirect=()=>{
            setTimeout(()=>{
                this.props.history.push('/tickets')
            },3000)   
        }
        if(this.props.ticket){
            this.props.dispatch(startEditTicket(formData,this.props.ticket._id,success,redirect))
        }
        else{
        this.props.dispatch(startPostTicket(formData,success,redirect))
        }
      
        this.setState({
            code:'',
            customer:'',
            department:'',
            employees: "",
            message:'',
            priority:'',
        })
     
       
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleDepartmentChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
            employees:""
        })
        this.multiselectRef.current.resetSelectedValues();
    }
   
    onSelect=(selectedList,selectedItem)=>{
            //console.log(selectedList,selectedItem)
            this.setState({
                employees:selectedList.map(lis=>({'employee':lis._id}))
        })
    }
    onRemove=(selectedList,removedItem)=>{
        //console.log(selectedList,removedItem)
        if(selectedList.length>0){
        this.setState({employees:selectedList.map(lis=>({'employee':lis._id}))
       
    })
}
else{
    this.setState({employees:""})
}
    }
   
     render(){
        return(
                <div>
                    <Card className='align-card'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='code'>Code</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                        <input
                                            type='text'
                                            value={this.state.code}
                                            onChange={this.handleChange}
                                            id="code"
                                            name='code'
                                            placeholder="enter the code"
                                            style={{width:'100%'}}
                                            className='form-control'
                                        />
                                    </Col>
                                </Row>
                            </div>
                           
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 sm-3 12'><label htmlFor='customer'>Customers</label></Col>
                                            <Col col='col-lg-10 sm-9 12'>
                                            <select onChange={this.handleChange} name='customer' value={this.state.customer} id='customer' style={{width:'100%'}}
                                            className='form-control'>
                                                <option value=''>select</option>
                                                {
                                                    this.props.customers.map(cust=>{
                                                    return <option key={cust._id} value={cust._id}>{cust.name}</option>
                                                    })
                                                }
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                
                          
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 sm-3 12'><label htmlFor='department'>Department</label></Col>
                                            <Col col='col-lg-10 sm-9 12'>
                                            <select onChange={this.handleDepartmentChange} name='department' value={this.state.department} id='department' style={{width:'100%'}}
                                            className='form-control'>
                                                <option value=''>select</option>
                                                {
                                                    this.props.departments.map(dept=>{
                                                    return <option key={dept._id} value={dept._id}>{dept.name}</option>
                                                    })
                                                }
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                
                         
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 sm-3 12'><label>employees</label></Col>
                                            <Col col='col-lg-10 sm-9 12'>
                                            <Multiselect
                                                options={filterEmployeesOnDepartment(this.state.department && this.state.department,this.props.employees)}
                                                displayValue='name'
                                                onSelect={this.onSelect}
                                                onRemove={this.onRemove}
                                                selectedValues={this.state.selectedValue}
                                                ref={this.multiselectRef}
                                                style={{width:'100%',backgroundColor:'#fff'}}
                                                className='form-control'
                                            />
                                            </Col>
                                        </Row>
                                    </div>
                                
                            
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='message'>Message</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                    <textarea
                                    onChange={this.handleChange}
                                    value={this.state.message}
                                    name='message'
                                    id='message'
                                    placeholder='enter the message'
                                    style={{width:'100%'}}
                                    className='form-control'
                                    >
                                    </textarea>
                                    </Col>
                                </Row>
                            </div>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label>priority</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                                {
                                                    this.state.priorities.map(priority=>{
                                                        return(
                                                        <React.Fragment key={priority}>
                                                            <div className="form-check">
                                                                <label className="form-check-label">
                                                                    <input key={priority} type='radio' name='priority' value={priority} checked={this.state.priority===priority} onChange={this.handleChange} className='form-check-input'/>{priority}
                                                                </label>
                                                            </div>
                                                         </React.Fragment>
                                                         )
                                                    })
                                                } 
                                    </Col>
                                </Row>
                            </div>
                            <div className='button-align' style={{marginTop:'20px'}}>
                                <Button success type='submit'>submit</Button>
                            </div>
                        </form>
                      
                    </Card>
                    {this.state.success &&<Alert success style={{marginTop:'15px'}}>{this.state.success}</Alert>}
                </div>
          
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        customers:state.customers,
        departments:state.departments,
        employees:state.employees
    }
}
export default withRouter(connect(mapStateToProps)(TicketForm))
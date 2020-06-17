import React from 'react'
import {connect} from 'react-redux'
import { Multiselect } from 'multiselect-react-dropdown'
import {Container,Row,Col,Button,Card} from 'bootstrap-4-react'
class EditTicket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            code:props.ticket&& props.ticket.code,
            customer:'',
            department:'',
            selectedValues:[],
            message:props.ticket &&props.ticket.message,
            priority:props.ticket && props.ticket.priority,
            success:''
            
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSelect=(selectedList,selectedItem)=>{
        this.setState({
            selectedValues:selectedList.map(sel=>{
                return {'_id':sel._id}
            })
        })

    }
    onRemove=(selectedList,removedItem)=>{
        this.setState({
            selectedValues:selectedList
        })
    }

    handlePriority=(priority)=>{
        this.setState({priority})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const cust=this.props.customers.find(cust=>cust.name==this.state.customer)
        const dept=this.props.departments.find(dept=>dept.name==this.state.department)
        const formData={
            code:this.state.code,
            customer:cust && cust._id,
            department:dept && dept._id,
            employees:this.state.selectedValues,
            priority:this.state.priority,
            message:this.state.message
        }
    }
    render(){
        const dept=this.state.department&&(
            this.props.departments.find(dep=>dep.name==this.state.department)
        )
        const emp=this.props.employees.filter(emp=>emp._id==dept._id)
        return(
            <div>
               <Container>
                <div>
                    <h1 style={{marginBottom:'40px'}}>Add Ticket</h1>
                    <Card className='align-card'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='code'>Code</label></Col>
                                    <Col col='col-lg-10 col-sm-9 col-12'>
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
                            {
                                this.props.customers.length==0 ?(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='customers'>Customers</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <select id='customers' style={{width:'100%'}}
                                            className='form-control'>
                                                <option>select</option>
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                ):(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='customer'>Customers</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <select onChange={this.handleChange} name='customer' value={this.state.customer} id='customer' style={{width:'100%'}}
                                            className='form-control'>
                                                <option>select</option>
                                                {
                                                    this.props.customers.map(cust=>{
                                                    return <option>{cust.name}</option>
                                                    })
                                                }
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                            {
                                this.props.departments.length==0 ?(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='department'>Department</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <select id='department' style={{width:'100%'}}
                                            className='form-control'>
                                                <option>select</option>
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                ):(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='department'>Department</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <select onChange={this.handleChange} name='department' value={this.state.department} id='department' style={{width:'100%'}}
                                            className='form-control'>
                                                <option>select</option>
                                                {
                                                    this.props.departments.map(dept=>{
                                                    return <option>{dept.name}</option>
                                                    })
                                                }
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                            {
                            
                            this.props.employees.length==0 ?(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='employees'>employees</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <select id='employees' style={{width:'100%'}}
                                            className='form-control'>
                                                <option>select</option>
                                            </select>
                                            </Col>
                                        </Row>
                                    </div>
                                ):(
                                    <div className='form-group'>
                                        <Row>
                                            <Col col='col-lg-2 col-sm-3 col-12'><label>employees</label></Col>
                                            <Col col='col-lg-10 col-sm-9 col-12'>
                                            <Multiselect
                                                options={emp}
                                                displayValue='name'
                                                onSelect={this.onSelect}
                                                onRemove={this.onRemove}
                                                style={{width:'100%',backgroundColor:'#fff'}}
                                                className='form-control'
                                            />
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 col-sm-3 col-12'><label htmlFor='message'>Message</label></Col>
                                    <Col col='col-lg-10 col-sm-9 col-12'>
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
                                    <Col col='col-lg-2 col-sm-3 col-12'><label>priority</label></Col>
                                    <Col col='col-lg-10 col-sm-9 col-12'>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                        <input type='radio' name='priority' value='High' checked={this.state.priority} onChange={()=>{this.handlePriority('High')}} className='form-check-input'/>High
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                            <input type='radio' name='priority' value='Medium' checked={this.state.priority} onChange={()=>{this.handlePriority('Medium')}} className='form-check-input'/>Medium
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                            <input type='radio' name='priority' value='Low' checked={this.state.priority} onChange={()=>{this.handlePriority('Low')}} className='form-check-input'/>Low
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className='button-align' style={{marginTop:'20px'}}>
                                <Button success type='submit'>submit</Button>
                            </div>
                        </form>
                        <p className='success-message'>{this.state.success}</p>
                    </Card>
                </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps=(state,props)=>{
    return{
        ticket:state.tickets.find(tick=>tick._id==props.match.params.id),
        employees:state.employees,
        customers:state.customers,
        departments:state.departments   
    }
}

export default connect(mapStateToProps)(EditTicket)
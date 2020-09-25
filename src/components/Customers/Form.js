import React from 'react'
import {connect} from 'react-redux'
import {startGetPostCustomer, startEditCustomer} from '../../actions/customersAction'
import {Container,Row,Col,Button,Card,Alert} from 'bootstrap-4-react'
import {withRouter} from 'react-router-dom'

class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.customer? props.customer.name:'',
            email:props.customer ? props.customer.email:'',
            mobile:props.customer ? props.customer.mobile:'',
            success:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile
        }
        console.log(formData)
        const redirect=()=>{
            setTimeout(()=>{
                this.props.history.push('/customers')
            },3000)
           
        }
        const success=()=>{
            this.setState({success:this.props.customer ?'customer details edited successfully':'customer details has been submitted successfully'})
        }
        if(this.props.customer){
            this.props.dispatch(startEditCustomer(formData,this.props.customer._id,redirect,success))
        }
        else{
        this.props.dispatch(startGetPostCustomer(formData,redirect,success))
        }
        this.setState({
            name:'',
            email:'',
            mobile:''
        })
    }
    
    render(){
        return(
                <React.Fragment>
                    <Card className='align-card'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='name' style={{width:'100%',textAlign:'center'}}>Name</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                    <input
                                        type='text'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        id='name'
                                        name='name'
                                        placeholder='enter your name'
                                        style={{width:'100%'}}
                                        className='form-control'
                                    />
                                    </Col>
                                </Row>
                            </div>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='email' style={{width:'100%',textAlign:'center'}}>Email</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                    <input
                                        type='text'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        id='email'
                                        name='email'
                                        placeholder='enter your email'
                                        style={{width:'100%'}}
                                        className='form-control'
                                    />
                                    </Col>
                                </Row>
                            </div>
                            <div className='form-group'>
                                <Row>
                                    <Col col='col-lg-2 sm-3 12'><label htmlFor='mobile' style={{width:'100%',textAlign:'center'}}>Mobile</label></Col>
                                    <Col col='col-lg-10 sm-9 12'>
                                        <input
                                            type='number'
                                            value={this.state.mobile}
                                            onChange={this.handleChange}
                                            id='mobile'
                                            name='mobile'
                                            placeholder='enter your mobile number'
                                            style={{width:'100%'}}
                                            className='form-control'
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className='button-align' style={{marginTop:'20px'}}>
                                <Button success type='submit'>submit</Button>
                            </div>
                        </form>
                       
                    </Card>
                    {this.state.success &&<Alert success style={{marginTop:'15px'}}>{this.state.success}</Alert>}
                </React.Fragment>
           
        )
    }
}

export default withRouter(connect()(CustomerForm))
import  React from 'react'
import {connect} from 'react-redux'
import { Progress ,Container} from 'bootstrap-4-react';
import { ticketStatusChange } from '../../actions/ticketsAction';
import {Chart} from 'react-google-charts'
import {calculateTicketsOnDept,highTicketPriority,lowTicketPriority,mediumTicketPriority} from '../../selectors/TicketSelector'
class TicketCharts extends React.Component{
    calculatePercentage=()=>{
        const ticketsLength=this.props.tickets.length
        console.log('length',ticketsLength)
        const total=100
        const ticketsPercentege=(total/ticketsLength)
        const completed=this.props.completedTickets.length
        const completedPercentage=Math.trunc((ticketsPercentege)*completed)
        return completedPercentage
    }
    highPriority=()=>{
        const highPriority=highTicketPriority(this.props.pendingTickets)
        return highPriority.length
    }
    mediumPriority=()=>{
        const mediumPriority=mediumTicketPriority(this.props.pendingTickets)
        return mediumPriority.length
    }
    lowPriority=()=>{
        const lowPriority=lowTicketPriority(this.props.pendingTickets)
        return lowPriority.length
    }
   
    
    render(){
        const maindata=[]
        const data= ["Element", "Tickets", { role: "style" }]
       // const colors=['silver','gold','brown','blue','orange']
        maindata.push(data)

        this.props.departments.map(dept=>{
            const depArray=[]
            const first=dept.name
            const second=calculateTicketsOnDept(dept.name,this.props.pendingTickets,this.props.departments)
            console.log('sec',second)
            const third='silver'
            depArray.push(first,second,third)
            return maindata.push(depArray)
        })

        console.log('maindata',maindata)


        return(
            <Container className='padding-0'>
            <div>
               
                    <h5>completed Tickets-{this.calculatePercentage()} %</h5>
                <Progress mb="2">
                    <Progress.Bar striped min="0" max="100" now={this.calculatePercentage()} bg="info"/>
                </Progress>
                <h1 style={{marginTop:'20px'}}>List of pending Tickets</h1>
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Task', 'Hours per Day'],
                        ['high', this.highPriority()],
                        ['medium', this.mediumPriority()],
                        ['low', this.lowPriority()]
                    ]}
                    options={{
                        title: 'Tickets By Priority',
                        // Just add this option
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                    />
                  
                     <Chart
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        width="100%"
                        height="400px"
                        options={{
                            title: 'Tickets By Departments',
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                        data={maindata}
                        
                        />
            </div>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        tickets:state.tickets,
        departments:state.departments
    }
}

export default connect(mapStateToProps)(TicketCharts)
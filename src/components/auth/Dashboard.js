import React from 'react'
import {connect} from 'react-redux'
import Chart from "react-google-charts";
import {Container} from 'bootstrap-4-react'
function Dashboard(props){
    const data = [
        ["Task", "Count"],
        [`Customers-${props.customers.length}`, props.customers.length],
        [`Departments-${props.departments.length}`,props.departments.length],
        [`Employees-${props.employees.length}`, props.employees.length],
        [`Tickets-${props.tickets.length}`, props.tickets.length] // CSS-style declaration
      ];
      const options = {
        pieHole: 0.4,
        is3D: false
      };
    return(
        <Container>
            <React.Fragment>
                <h1 style={{textAlign:'center',marginTop:'40px'}}>Ticket Master Statistics</h1>
                <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
            />
            </React.Fragment>
        </Container>
    )
}

const mapStateToProps=(state)=>{
    return{
        customers:state.customers,
        departments:state.departments,
        employees:state.employees,
        tickets:state.tickets
    }
}

export default connect(mapStateToProps)(Dashboard)
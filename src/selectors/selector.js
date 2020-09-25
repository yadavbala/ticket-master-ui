export const findDeptEmployee=(departments,dept)=>{
        return departments.find(dep=>dep.name==dept)
}

export const findCustomerTicket=(customers,cust)=>{
        return customers.find(cus=>cus.name==cust)
}

export const findDeptTicket=(departments,dept)=>{
    return departments.find(dep=>dep.name==dept)
}

export const findDeptName=(departments,dept)=>{
    return departments.find(dep=>dep.name==dept)
}

export const filterEmployeesOnDept=(employees,dept)=>{
    return employees.filter(emp=>emp._id==dept._id)
}

export const calculateTicketsOnDept=(dept,tickets,departments)=>{
    console.log('list',dept)
    const department=departments.find(dep=>dep.name==dept)
    const ticketsOnDept=tickets.filter(tick=>tick.department==department._id)
    return ticketsOnDept.length
}

export const findCustomer = (customers,id)=>{
    return customers.find(cust=>cust._id==id)
}

export const filterTicketsOnCustomer=(tickets,id)=>{
    return tickets.filter(tick=>tick.customer==id)
}

export const pendingTickets=(tickets)=>{
    return tickets.filter(tick=>!tick.isResolved)
}

export const completedTickets=(tickets)=>{
        return tickets.filter(tick=>tick.isResolved)
}

export const findCustomerNameTickets=(customers,cust)=>{
    return customers.find(cus=>cus._id==cust)
}

export const findDepartmentNameTickets=(departments,department)=>{
    return departments.find(dep=>dep._id==department)
}

export const filterTicketsOnDept=(tickets,id)=>{
    return tickets.filter(tick=>tick.department==id)
}

export const findDepartment=(departments,id)=>{
    return departments.find(dep=>dep._id==id)
}

export const EditDeptEmp=(departments,dept)=>{
    return departments.find(dep=>dep.name==dept)
}

export const findEmployee=(employees,id)=>{
    return employees.find(emp=>emp._id==id)
}

export const findTicket=(tickets,id)=>{
    return tickets.find(tick=>tick._id==id)
}

export const findCustomerId=(customers,customer)=>{
    return customers.find(cust=>cust.name==customer)
}

export const findDepartmentId=(departments,department)=>{
    return departments.find(dep=>dep.name==department)
}

export const findDepartmentEmployee=(departments,empdept)=>{
    return departments.find(dep=>dep._id==empdept)
}

export const highTicketPriority=(tickets)=>{
    return tickets.filter(tick=>tick.priority=='High')
}

export const mediumTicketPriority=(tickets)=>{
    return tickets.filter(tick=>tick.priority=='Medium')
}

export const lowTicketPriority=(tickets)=>{
    return tickets.filter(tick=>tick.priority=='Low')
}

export const ticketShowCustomer=(customers,customer)=>{
        return customers.find(cust=>cust._id==customer)
}

export const ticketShowDepartment=(departments,department)=>{
    return departments.find(dept=>dept._id==department)
}


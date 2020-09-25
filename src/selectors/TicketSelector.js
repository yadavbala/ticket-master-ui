
export const findTicket=(tickets,id)=>{
        return tickets.find(tick=>tick._id==id)
}

export const pendingTickets=(tickets)=>{
        return tickets.filter(tick=>!tick.isResolved)
    }
    
export const completedTickets=(tickets)=>{
        return tickets.filter(tick=>tick.isResolved)
    }


export const calculateTicketsOnDept=(dept,tickets,departments)=>{
console.log('list',dept)
const department=departments.find(dep=>dep.name===dept)
const ticketsOnDept=tickets.filter(tick=>tick.department===department._id)
return ticketsOnDept.length
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

export const allTicketsOnCustomer=(tickets,id)=>{
        return tickets.filter(tick=>tick.customer===id)
}

export const pendingTicketsOnCustomer=(tickets,id)=>{
        const pending=pendingTickets(tickets)
        return pending.filter(tick=>tick.customer===id)
}

export const completedTicketsOnCustomer=(tickets,id)=>{
        const completed=completedTickets(tickets)
        return completed.filter(tick=>tick.customer===id)
}

export const allTicketsOnDepartment=(tickets,id)=>{
        return tickets.filter(tick=>tick.department===id)
}

export const pendingTicketsOnDepartment=(tickets,id)=>{
        const pending=pendingTickets(tickets)
        return pending.filter(tick=>tick.department===id)
}

export const completedTicketsOnDepartment=(tickets,id)=>{
        const completed=completedTickets(tickets)
        return completed.filter(tick=>tick.department===id)
}

export const allTicketsOnEmployee=(tickets,id,employees)=>{
        //const emp=employees.find(emp=>emp._id===id)
                return tickets.filter(tick=>tick.employees.find(tick1=>tick1.employee===id))
}
export const pendingTicketsOnEmployee=(tickets,id,employees)=>{
        //const emp=employees.find(emp=>emp._id===id)
                const pending=pendingTickets(tickets)
                return pending.filter(tick=>tick.employees.find(tick1=>tick1.employee===id))
}

export const completedTicketsOnEmployee=(tickets,id,employees)=>{
        //const emp=employees.find(emp=>emp._id===id)
                const completed=completedTickets(tickets)
                return completed.filter(tick=>tick.employees.find(tick1=>tick1.employee===id))
}


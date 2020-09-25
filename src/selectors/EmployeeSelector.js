export  const findEmployee=(employees,employee)=>{
    return employees.find(emp=>emp._id===employee)
}

export const filterEmployeesOnDepartment=(department,employees)=>{
        return employees.filter(emp=>emp.department===department)
}

export const showEmployee=(employees,tick)=>{
        console.log('ticker',tick)
        const tickIds=tick.map(tick=>tick.employee)
        const empl= employees.filter(emp=>{
            return tickIds.includes(emp._id)
        })
        //console.log('empl',empl)
        const empName=empl.map(em=>em.name)
       // console.log('empname',empName)
        return empName
}
export const findDepartment=(departments,id)=>{
    return departments.find(dep=>dep._id===id)
}

export const findDepartmentOnId=(departments,department)=>{
    return departments.find(dept=>dept._id===department)
}
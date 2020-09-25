export const findCustomer=(customers,id)=>{
    return customers.find(cust=>cust._id===id)
}

export const findCustomerOnId=(customers,customer)=>{
    return customers.find(cust=>cust._id===customer)
}
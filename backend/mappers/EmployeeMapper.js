export const EmployeeMapper = (employee)=>({
    name:employee.name,
    email:employee.email,
    companyId:employee.companyId,
    department:employee.department,
    departmentId:employee.departmentId,
    role:employee.role,
    profilepic:employee.profilepic,
    isActive:employee.isActive,
    joinedAt:employee.createdAt
})

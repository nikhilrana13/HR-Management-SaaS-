
export const HrMapper = (hr)=>({
    id:hr._id,
    name:hr.name,
    email:hr.email,
    companyId:hr.companyId,
    role:hr.role,
    profilepic:hr.profilepic,
    isverified:hr.isverified,
    createdAt:hr.createdAt
})


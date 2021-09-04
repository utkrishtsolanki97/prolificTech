import bcrypt from 'bcryptjs';

const users  = [
    {
        name : 'admin',
        email : 'admin@admin',
        password : bcrypt.hashSync('admin',10),
        phoneNumber : 8512879361,
        gender : 'male',
        isAdmin : true
    },
    {
        name : 'Utkrisht Solanki',
        email : 'utkrishtsolanki97@gmail.com',
        password : bcrypt.hashSync('123456',10),
        phoneNumber : 8750752179,
        gender: 'male'
    },
    {
        name : 'Himani Solanki',
        email : 'himani@gmail.com',
        password : bcrypt.hashSync('123456',10),
        phoneNumber : 9899802915,
        gender: 'female',
        isAdmin : false
    },
]

export default users;
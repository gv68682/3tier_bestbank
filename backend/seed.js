//require('dotenv').config()
import {} from 'dotenv/config'
import mongoose  from 'mongoose'
import User from './models/user.js';

//const firebaseId = 'kzWVea9fd2ZVJdUcYS3V7p4XXcw2'


const data = [
  {name:'abel',email:'abel@mit.edu',password:'secret',balance:500},
  {name:'anne',email:'anne@mit.edu',password:'secret',balance:100},
  {name:'don',email:'don@mit.edu',password:'secret',balance:100}
]

console.log(process.env.DB);

mongoose
  .connect(process.env.DB)
  .then(async x => {
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`)


    const users = data
      .map(({ name, email, password, balance }) => {
        if (email && password) {
          return {
            name,
            email,
            password,
            balance,        
          }
        }
      })
      .filter(Boolean)  //it will filter any undefined valu objects

    try {
      const createdUsers = await User.create(users)
      console.log(
        `Success! - ${createdUsers.length} users added to mogodb bankdb`
      )
      mongoose.connection.close()
    } catch (e) {
      console.log(e)
    }
  })
  .catch(err => console.log(err))


import express from 'express'
const app = express()
import mongoose  from 'mongoose'
import User from '../models/user.js'

//Vonnect DB
const db = mongoose
  .connect(process.env.DB)
  .then(connect => {
    console.log(`Connected to Mongo! Database name: ${connect.connections[0].name}`)
  })
  .catch(err => console.log(err));


// GET /All Users Data
app.get('/allUsers/',  (req, res) => {

  User.find({}, (err, users) => {
    if (err) {
      res.status(404).json({messaage: err})
    } else {
      console.log(users);
      res.status(200).json(users);
    }
  })
})
   
//GET specific user data
app.get('/userId/', (req, res) => {
  const id = req.query._id;

  User.findById(id, (err, user) => {
    if (err) {
      res.status(404).json({messaage: err})
    } else {
      console.log(user);
      res.status(200).json(user);
    }
  })
})
   
  
app.put('/userId/', (req, res) => {
  User.updateOne(req.query, req.body, (err, user) => {
    if(err){
      res.status(404).json({message: err})
    } else {
      console.log(user);
      res.status(200).json({Message: "updated successfully"});
    }
  })
})
   
   
   // app.get('/transactions/:id', (req, res) => {
   //   const id = req.params.id
   //   console.log('id', id)
   //   const transaction = db.get('transactions').getById(id).value()
   //   console.log('transaction', transaction)
   //   if (transaction) {
   //     res.status(200).json(transaction)
   //   } else {
   //     res.status(404).json({ message: 'Wrong id. Try again' })
   //   }
   // })
   
   // app.post('/transactions', (req, res) => {
   //   console.log('req.body', req.body)
   //   const transaction = {
   //     name: req.body.name,
   //     amount: req.body.amount,
   //     date: req.body.date,
   //     category: req.body.category,
   //     type: req.body.type,
   //     created_at: new Date(),
   //     updated_at: new Date(),
   //   }
   
   //   const createdTransaction = db.get('transactions').insert(transaction).write()
   
   //   res.status(201).json(createdTransaction)
   // })
   
   // app.put('/transactions/:id', (req, res) => {
   //   // Get id from path (params)
   //   console.log('req.params', req.params)
   //   const id = req.params.id
   //   //Get body from request
   //   const { name, amount, date, category, type } = req.body
   //   // Find the transaction with by id from the database
   //   // if it matches, we'll update the transaction
   //   const updatedTransaction = db
   //     .get('transactions')
   //     .updateById(id, {
   //       name,
   //       amount,
   //       date,
   //       category,
   //       type,
   //       updated_at: new Date(),
   //     })
   //     .write()
   
   //   if (updatedTransaction) {
   //     res.status(200).json(updatedTransaction)
   //   } else {
   //     res.status(404).json({ message: 'That transaction does not exist' })
   //   }
   // })
   
   // app.delete('/transactions/:id', (req, res) => {
   //   const { id } = req.params
   
   //   const deletedTransaction = db.get('transactions').removeById(id).write()
   
   //   console.log('deletedTransaction', deletedTransaction)
   //   if (deletedTransaction) {
   //     res.status(200).json(deletedTransaction)
   //   } else {
   //     res.status(404).json({ message: 'That transaction does not exist' })
   //   }
   // })

   export default app;
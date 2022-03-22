import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const accessTokenSecret = process.env.JWTSECRET;

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if(err || !user) {
            res.status(401).json('user does not exist');
        } else {
            bcrypt.compare(password, user.password).then(result => {
                if (result === true)  {
                    const accessToken = jwt.sign(
                        { name: user.name, id: user._id }, //token
                        accessTokenSecret, // secret used to sign token
                        { expiresIn: '120m' } //token details
                    )
            
                    res.json(accessToken);
                } else {
                    res.status(401).json('invalid password')
                }
            });
        }
    })
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ name: name}, (err, user) => {
        if(user) {
            res.status(500).send('user exists');
        } else {
            //do some stuff to hash a password
            
            User.create({
                name: name,
                email:email,
                password: password
            }, (userErr, user) => {
                if (userErr) {
                    console.log(userErr);
                    res.status(500).send('error')
                } else {
                    const accessToken = jwt.sign(
                        { name: user.name, id: user._id }, //token
                        accessTokenSecret, // secret used to sign token
                        { expiresIn: '120m' } //token details
                    )
                    res.status(200).json(accessToken);
                }
            })  
        }
    })
})

router.post('/logout', (req, res) => {

})

export default router;
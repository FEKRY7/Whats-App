const express = require('express')
const router = express.Router()
const {SignUp,SignIn,findUser,getUsers} = require('./../Controler/UsersControl.js')
// const authenticate = require('./../Maddewares/UsersMaddlwares.js')
  

router.post("/SignUp",SignUp)

router.post('/SignIn',SignIn)

router.get('/findUser/:id',findUser)

router.get('/',getUsers)

module.exports = router
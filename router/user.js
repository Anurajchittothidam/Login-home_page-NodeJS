const express =require('express')
const router =express.Router()
const { validateUserSession }= require("../controllers/UserSession")
const { products }=require("../controllers/products")
const { table }=require("../controllers/table")
const { cards }=require("../controllers/cards")
const { list }=require("../controllers/list")
require('dotenv').config();



// login get 
router.get('/',(req,res)=>{
  let session =req.session.user
    if(session){
        res.redirect('/home')
    }else{
        res.render('login',{error:req.session.Err})
        req.session.Err= null;
    }
})
// login post 
router.post('/login', (req, res) => {
    const { username, password } = req.body; 
    let passwordDB = process.env.DB_PASSWORD;
    let usernameDB = process.env.DB_NAME;
    // Authenticate the user
    if (username === usernameDB && password === passwordDB) {
      req.session.user=req.body.username;
      res.redirect('/home')
    } else {
      req.session.Err="Password or User name incorrect"
      res.redirect('/')
    }
  });

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

// home 
router.get('/home', validateUserSession,(req,res)=> {       
  res.render('home',{products})
})

// cards
router.get('/cards',validateUserSession,(req,res)=>{ 
    res.render('card',{cards});
})

// list
router.get('/list',validateUserSession,(req,res)=>{
  res.render('list',{list})
})
// table
router.get('/table',validateUserSession,(req,res)=>{
    res.render('table',{table})
})

module.exports = router;
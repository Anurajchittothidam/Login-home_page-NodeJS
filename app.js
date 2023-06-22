const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const session =require('express-session')
const cookieParser=require('cookie-parser')
const path =require('path')
const bodyParser=require('body-parser')
const userRouter =require('./router/user')
require('dotenv').config();

let port=process.env.PORT;
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
app.set('views',(path.join(__dirname,'views')))
app.set('view engine','ejs');
app.use(expressLayouts)
app.set('layout','./layout/layout')
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'public')));


app.use(session({
    secret:'key',
    cookie: { maxAge : 60000 },
    resave: false,
    saveUninitialized: false
}))
//to prevent storing cache
app.use((req, res, next) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"     
    );
    next();
})
app.use('/',userRouter)

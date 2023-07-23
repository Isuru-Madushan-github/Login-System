const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const router=require('./routes/router');

const app=express();
const port=process.env.PORT || 3000;


app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname,'./public/assets')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/',router);


app.listen(port,()=>{console.log(`Server is running at port ${port}`)});
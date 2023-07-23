const express=require('express');
const router=express.Router();

const credentials={
    email: 'admin123@gmail.com',
    password: 'admin123'
};

router.get('/',(req,res)=>{
    res.render('index',{title: "Login System"});
});

router.post('/login',(req,res)=>{
    if(req.body.email==credentials.email && req.body.password==credentials.password){
        req.session.user=req.body.email;
        res.redirect('/dashboard');
        // res.end('login success');
    }else{
        res.end('invalid user');
    }
});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user: req.session.user});
    }else{
        res.send('Unauthorized user');
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.render('index',{message: 'Logout Successfully...!'});
        }
    });
});

module.exports=router;
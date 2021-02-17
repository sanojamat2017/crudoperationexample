var express=require('express');
var cookieParser=require('cookie-parser');
var session=require('express-session');

var app=express();
app.use(cookieParser());
app.use(session({secret:'This is a session concept'}));
app.get('/',function(req,res){
    if(req.session.count){
        req.session.count++;
        res.send('You visited this page'+req.session.count+'times');
    }
    else{
        req.session.count=1;
        res.send('Welcome to this page for the first time!!!!');
    }
});
app.listen(3000);
console.log('Server Started with port 3000');
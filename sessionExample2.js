var express=require('express');
var session=require('express-session');
var bodyParser=require('body-parser');

var app=express();
app.set('views',__dirname+'/views');
app.engine('html',require('ejs').renderFile);

app.use(session({secret:'This is a session concept'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    if(req.session.email){
        res.redirect('/admin');
    }
    else{
        res.render('index.html');
    }
});

app.post('/login',function(req,res){
    req.session.email=req.body.email;
    req.session.password=req.body.pass;

    res.end('done');
});

app.get('/admin',function(req,res){
    if(req.session.email){
        res.write('<h1>Hello '+req.session.email+'</h1>');
        res.write('<a href="/logout">Logout</a>');
        res.end();
    }
    else{
        res.write('<h1>Please Login First</h1>');
        res.write('<a href="/">Login</a>');
        res.end();
    }
});
app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
});
app.listen(8000);
console.log('Server Started with posrt 8000');


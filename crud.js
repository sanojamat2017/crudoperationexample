var express=require('express');
var path=require('path');
var app=express();
var mysql=require('mysql');
var ejs=require('ejs');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
var bodyParser=require('body-parser');

var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fullstack"
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/menu',function(req,res){
    res.sendFile(__dirname+"/menu.html");
});

app.get('/test',function(req,res){
    res.sendFile(__dirname+"/Register.html");
})
app.post('/register',function(req,res){
    var sname=req.body.sname;
    var email=req.body.emails;
    var city=req.body.city;
    var state=req.body.state;
    var age=req.body.age;

    conn.connect(function(err){
        var sql="insert into student(stud_name,email_id,city,state,age) values('"+sname+"','"+email+"','"+city+"','"+state+"','"+age+"')";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Inserted");
            res.redirect('test');
        });
    });

});

app.get('/test1',function(req,res){
    res.sendFile(__dirname+"/update.html");
})
app.post('/updatedata',function(req,res){
    var sname=req.body.sname;
    var email=req.body.emails;
    var city=req.body.city;
    var state=req.body.state;
    var age=req.body.age;
    var ids=req.body.ids;

    conn.connect(function(err){
        var sql="update student set stud_name='"+sname+"',email_id='"+email+"',city='"+city+"',state='"+state+"',age='"+age+"' where stud_id='"+ids+"'";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Updated");
            res.redirect('test1');
        });
    });

});

app.get('/test2',function(req,res){
    res.sendFile(__dirname+"/delete.html");
})
app.post('/deletedata',function(req,res){

    var ids=req.body.ids;

    conn.connect(function(err){
        var sql="delete from student where stud_id='"+ids+"'";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Deleted");
            res.redirect('test2');
        });
    });

});
app.get('/test4',function(req,res){
    var sql="select * from student";
    conn.query(sql,function(err,rows){
        if(err) throw err;
        res.render('select',{
            studs:rows
        });
    });
});
app.listen(3000);
console.log("Server Stated");
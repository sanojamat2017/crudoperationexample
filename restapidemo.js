var express=require('express');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser');
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fullstack"
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Connected mysql Database");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/customer',function(req,res){
    conn.query('select * from customer',function(error,results,fields){
        if(error)throw error;
        res.end(JSON.stringify(results));
    });
});

app.post('/customer',function(req,res){
    var params=req.body;
    console.log(params);
    conn.query('insert into `customer` set ?',params,function(error,results,field){
        if(error)throw error;
        res.end(JSON.stringify(results));
    });
});

app.put('/customer',function(req,res){
    conn.query('update customer set Name=?,Address=?,Country=?,Phone=? where Id=?',[req.body.Name,req.body.Address,req.body.Country,req.body.Phone,req.body.Id],function(error,results,fields){
        if(error)throw error;
        res.end(JSON.stringify(results));
    });
});

app.delete('/customer',function(req,res){
    console.log(req.body);
    conn.query('delete from customer where id=?',[req.body.id],function(error,results,fields){
        if(error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.listen(3000);
console.log('Server Started');

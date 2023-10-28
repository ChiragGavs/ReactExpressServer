var mysql=require('mysql');
var exp=require('express');
var cors = require('cors');
var bparser = require('body-parser');
bparserInit=bparser.urlencoded({extended:true});

var app=exp(); //Initializing expresjs.
app.use(cors());
app.use(exp.json());

//connection configuration 
mysqlconnection=mysql.createConnection({
    host:'localhost',
    database:'world',
    user:'root',
    password:'root',
    port:3306
});

//checking if connection established 
function checkConnection(error){
    if(error == undefined){
        console.log("Connected to the database...");
    }
    else{   console.log(" ");
        console.log("unable to establish connection :)");
        console.log("Error code:" + error.errno)
        console.log(error.message);
    }
}

function feedBack(error){
    if (error != undefined){
        console.log(error.errno);
        console.log(error.message);
    }
    else{
        console.log("Open the browser and visit this url http://localhost:8800/getAll");
    }
}

var queryresults=undefined;
var statusmsg = undefined;

function processResults(error , results)
{
    queryresults=results;
    console.log(results);
}

function displayAllUsers(request,response)
{
    mysqlconnection.connect(checkConnection);
    mysqlconnection.query('select * from users' , processResults);
    response.send(queryresults);
}

/*function getUserById(request,response)
{
    var userid=request.query.userid;
    mysqlconnection.query('select * from users where usedid=' +userid ,processResults);
    response.send(queryresults);
}
app.get('/getById' , getUserById);
*/

function checkStatus(error ,results){
    statusmsg = results;
    console.log(statusmsg);
    if(error!=undefined) console.log(error.message);
    else console.log('function success');

}

function insertUser(request, response){
    mysqlconnection.connect(checkConnection);
    var userid = request.body.uid;
    var email_id = request.body.email;
    var password = request.body.passwd;
    console.log('Userid : ' + userid);
    console.log('email  :' + email_id);
    if(userid == undefined) console.log("no user id provided");
    mysqlconnection.query('insert into users values(?,?,?)',[userid,email_id,password],checkStatus);
    response.send(statusmsg);
}

function upadateUser(request, response){
    mysqlconnection.connect(checkConnection);
    var userid = request.body.uid;
    var email_id = request.body.email;
    var password = request.body.passwd;
    console.log('Userid to be update : ' + userid);
    mysqlconnection.query('update users set email = ? , password = ? where userid = ?',[email_id,password,userid],checkStatus);
    response.send(statusmsg);
}

app.get('/delete', (request, response) => {
    mysqlconnection.connect(checkConnection);
    const id = request.query.uid;
    console.log('Deleting the UserId :' + id);
    const sql = 'DELETE FROM users WHERE userid = ?';
    mysqlconnection.query(sql, id, checkStatus);
    response.send(statusmsg);
  });


app.listen(8900 , feedBack)
mysqlconnection.connect(checkConnection)
app.post('/update',bparserInit,upadateUser )
app.get('/getAll',displayAllUsers);            
app.post('/insert',bparserInit,insertUser);



// Entry Point of the API Server 

const express = require('express');

/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "*",
  user: "*",
  database: "*",
  password: "***"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error(
//             'Error acquiring client', err.stack)
//     }
//     client.query('SELECT NOW()', (err, result) => {
//         release()
//         if (err) {
//             return console.error(
//                 'Error executing query', err.stack)
//         }
//         console.log("Connected to Database !")
//     })
// })

app.get('/story/:id', (req, res, next) => {
  var id = req.params.id;
  var detail = req.params.detail;
  //res.send(id);
  con.query("Select * from story,storyDetail, storyToken where story.strId = " + id + " and story.strId = storyDetail.strId and storyDetail.id = storyToken.strDetailId ", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
    // var strname= result[0].strName;
    // var strId = result[0].strId;
    // var strAuthor = result[0].strAuthor;
    // var strType = result[0].strType;
    var strRes = JSON.stringify(result);
    const data = {
      id: result[0].strId,
      name: result[0].strName,
      author: result[0].strAuthor,
      type: result[0].strType,
      created: result[0].strDateCreated,
      modified: result[0].strDateModification,
      
      // storyDetail :{
      //   id: result[0].storyDetail.id,
      //   name: result[0].storyDetail.name,
      //   shortDesc: result[0].strShortDesc,
      //   longDesc: result[0].strLongDesc,
      // }

    }
    var dataRes = JSON.stringify(data);
    var dataRes2 = JSON.parse(dataRes);
    console.log(dataRes2);
    res.send(dataRes);
  });
})

// query to find all story's chapter and their tokenId

app.get('/story/:id/:detail', (req, res, next) => {
  var id = req.params.id;
  var detail = req.params.detail;
  //res.send(id);

  con.query("Select * from story,storyDetail, storyToken where story.strId = " + id + " and story.strId = storyDetail.strId and storyDetail.name = \""+detail+"\" and storyDetail.id = storyToken.strDetailId ", function (err, result) {
    if (err) throw err;
    var dataRes = JSON.stringify(result);
    var dataRes2 = JSON.parse(dataRes);
    console.log(dataRes2[0].name)
    var obj = {};
    var key = "Story";
    obj[key] = [];
    const data = {
      id: dataRes2[0].strId,
      name: dataRes2[0].strName,
      author: dataRes2[0].strAuthor,
      type: dataRes2[0].strType,
      created: dataRes2[0].strDateCreated,
      modified: dataRes2[0].strDateModification,
      detail: [],
      
    }
    obj[key].push(data);
    dataRes2.forEach(element => {
      var tmp_detail ={
        detail_id: element.strDetailId,
        detail_name : element.strDetailName,
        short_description : element.strShortDesc,
        long_description : element.strLongDesc,
        token:{
          token_id: element.strTokenId,
        }
      }
      
      obj[key][0].detail.push(tmp_detail);
    });
    
    
    // console.log(dataRes2[0]);
     res.send(JSON.stringify(obj));
  });
})


// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  // Starting the Server at the port 3000
})

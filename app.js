const express= require("express")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');



// Internal exoprts
const graphQlSchema = require('./graphql/schema/index');
const resolvers = require("./graphql/resolvers");
const Subject = require("./models/Subject");
const Student = require("./models/Students");

 

const app = express();
dotenv.config();


// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("database connection successfully"))
.catch(err=>console.log(err))

 
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});    

app.use(
    '/graphql',
    graphqlHttp.graphqlHTTP({
      schema: graphQlSchema,
      rootValue: resolvers,
      graphiql: true
    })
  );



  app.get("/",(req,res)=>{
      res.send("hello")
  })

//   let a = []
//   app.get('/sub',(req,res)=>{
//     Student.find({"subject.name":"Bangla"},(err,data)=>{
//       if(err){
//         res.json({
//           "msg":"erre"
//         })
//       }else{
//         res.send(data)
//         console.log(data)
//       }
//     })

//  console.log(a)
//   })

app.delete('/studentDelete/:id',(req,res)=>{
      Student.deleteOne({ _id:req.params.id},(err)=>{
        if(err){
          res.status(500).json({
            error:"There was a server side error..!"
          })
        }else{
          res.status(200).json({
            error:"Deleted Successfully..!"
          })
        }
      })
  

    })


  app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`)
})    
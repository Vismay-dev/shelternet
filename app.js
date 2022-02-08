const app = require('express')();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const methodOverride = require('method-override')
const secure = require('express-force-https')
const mongoSanitize = require('express-mongo-sanitize')
const dotenv = require('dotenv');
const API = require('./routes/API')
const cors = require('cors')
const cloudinary = require('cloudinary');

const express = require('express')


// app.use(methodOverride('_method'))
// app.use(secure)
// app.use(mongoSanitize())
dotenv.config()



mongoose.connect(process.env.MONGODB,{useUnifiedTopology:true,useNewUrlParser:true },
    ).then(()=> {
          console.log('- Connected to Shelter-App Database...')
      }).catch(err=> console.log(err))
  
  
  
  mongoose.connection.on('error', function (err) { console.log(err) });
  

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())

app.use(cors())

app.use('/api/user',API)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
port = process.env.PORT||4000
app.listen(port, () => {
    console.log(`- Server up and running at Port:${port}`)
})




// display - home, pet centers page, pet page, add pet, login, signup

// routes - register, login, getting pet centers,
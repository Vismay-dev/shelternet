const User = require('../models/user')
const PetCenter = require('../models/petCenter')
const bcrypt = require('bcrypt')

// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const session = require('express-session')
// // const MongoStore = require('connect-mongo')(session)
const multer = require('multer')
const cloudinary = require('cloudinary');
const res = require('express/lib/response');

const auth = require('../middleware/index.js')

const router = require('express').Router()

const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only jpg, jpeg, png and gif image files are allowed'), false)
    }
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: imageFilter })

router.post("/register", async function (req, res) {
    let newUser = new User(req.body.user);
    newUser.username = req.body.username;
    let hash = req.body.password?await bcrypt.hash(req.body.password.trim(), 10):false
    newUser.password = hash;
    
    
    if (req.body.adminCode === "petCenter123") {
        newUser.isShelter = true;
    }else{
        newUser.isShelter = false;
    }
    
    let user = User.register(newUser, req.body.password, async (err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }
        const token = jwt.sign({_id:user.username}, 
            process.env.TOKEN_SECRET,
            {expiresIn:'2.5h'});
         console.log('- Logged In')
         
         user.save()
 
         res.send({user:user, token: token}) 


        // passport.authenticate("local")(req, res, function () {
        //     console.log("reached2");
        //     req.flash("success", "Welcome, " + user.username);
        //     res.redirect("/pets");
        // });


    });
});

router.post(
    "/login",
    // passport.authenticate("local", {
    //     successRedirect: "/pets",
    //     failureRedirect: "/login",
    //     failureFlash: true,
    //     successFlash: "Welcome",
    // }),
    async(req, res) => {

        let userExistsWithId = await User.findOne({'username':req.body.username.trim()}).catch((err)=> console.log(err))
      
      if (!userExistsWithId) { 
         const error = 'Invalid Username'
         console.log(error)
         return res.status(400).send(error)
      }
      else {
          const passValid = await bcrypt.compare(req.body.password, userExistsWithId.password)
          if (!passValid) { 
            const error = 'Incorrect Password'
            console.log(error)
            return res.status(400).send(error)
         }
         else {
               const token = jwt.sign({_id:userExistsWithId.username}, 
                  process.env.TOKEN_SECRET,
                  {expiresIn:'2.5h'});
               console.log('- Logged In')
               res.send({user:userExistsWithId, token: token, isShelter:userExistsWithId.isShelter})    
      }}


     }
);

// router.get("/logout", (req, res) => {
//     req.logout();
//     console.log("Logged you out!");
//     req.flash("success", "Logged you out");
//     // res.redirect("/");
// });

router.post('/createshelter',  upload.single('images'), async (req, res) => {
    var images = []
    const token = req.body.token;

        
    
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    } 


    let editing = JSON.parse(req.body.editing)

    if(editing){
        console.log(req.file)
        if(req.file){
            const file = req.file
            await cloudinary.v2.uploader.upload(file.path, (err, result) => {
                images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                })
                console.log('uploaded')
            }).catch(err=> console.log(err.response))
            
        }
       
        const shelter = req.file? {...JSON.parse(req.body.shelter), id: req.user._id, image:images[0].url }:
        {...JSON.parse(req.body.shelter), id: req.user._id}
        PetCenter.updateOne({id:req.user._id},shelter, (err, shelter) => {
            if(err){
                console.log(err)
                return res.status(400).send(err)
            }
            res.send(shelter)
            console.log(shelter)
        })




    }else {
        const file = req.file
        await cloudinary.v2.uploader.upload(file.path, (err, result) => {
            images.push({
                url: result.secure_url,
                public_id: result.public_id
            })
            console.log('uploaded')
        })
 
const shelter = {...JSON.parse(req.body.shelter),image:images[0].url}

PetCenter.create({...shelter,id:req.user._id}, (err, shelter) => {
    if(err){
        console.log(err)
        return res.status(400).send(err)
    }
    res.send(shelter)
    console.log(shelter)
})
    }

       
    
   

})


// router.post('/updatecenter',  upload.array('images', 4),auth, async (req, res) => {
//     console.log(req.files)
//     console.log(req.body.competition)
//     req.body.center.images = []
//     if (req.files && req.files[0]) {
//         for (const file of req.files) {
//             await cloudinary.v2.uploader.upload(file.path, (err, result) => {
//                 req.body.center.images.push({
//                     url: result.secure_url,
//                     public_id: result.public_id
//                 })
//                 console.log('uploaded')
//             })
//         }
//     }

//     PetCenter.updateOne(req.body.center, (err, center) => {
//         if(err){
//             console.log(err)
//             res.redirect('back')
//         }
//         req.flash('success', 'Successfully added shelter.')
//         return res.redirect('/centers')
//     })
// })

router.post('/getshelters', auth, async (req, res) => {
    let centers = await PetCenter.find({})
    res.send(centers);
})

router.post('/getshelter', auth, async (req, res) => {
    let center = await PetCenter.findOne({id:req.user._id})
    res.send({center});
})

router.post('/getshelteronid', auth, async (req, res) => {
    let center = await PetCenter.findOne({_id:req.body.id})
    console.log(center)

    res.send({center});
})

module.exports = router

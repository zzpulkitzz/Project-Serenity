var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors")
require("dotenv").config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let {routerScore,routerUsers,routerAuth}=require("./controllers/router")
const { verifyToken } = require('./middleware/authMiddleware');

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let {connect,user_model}=require("./connect.js")
const app = express();







// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Store user info or session here
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});




app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
app.use("/users",routerUsers,routerAuth,routerScore)


// catch 404 and forward to error handler

app.get('/verify', verifyToken, async (req, res) => {
  console.log("hebhsb")
  try {
    console.log("uid:",req.user.uid)
    const user = await user_model.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user)
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

app.get("/clear",async (req,res)=>{
  await user_model.deleteMany({})
  res.send("cleared")
})
app.get('/login', (req, res) => {
  // Redirects the user to the Google authentication page
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
});

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'}),  // Redirect after successful login

    (req, res) => {
      res.redirect('https://project-serenity-8i86.onrender.com/');  // Redirect to your frontend dashboard
    }       // Redirect after login failure
  )

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.displayName}`);
  } else {
    res.redirect('/login');
  }
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let start=async()=>{
  try{
      await connect(process.env.USER_KEY)
      app.listen(process.env.PORT,()=>{
          console.log("Server Running")
      })
      console.log("Connected")

  }catch(err){
      console.log(err)
  }
  
}
start()
module.exports = app;

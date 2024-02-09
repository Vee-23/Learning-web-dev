if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride =require('method-override')

const initializePassport = require('./passport-config')
initializePassport(passport, (email => {
    users.find(user => user.email === email),
    id => users.find(user => user.id === id)
}))

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/index', checkAuthenticated, (req, res) => {
    res.render('index.html', { name: req.user.name })
})

app.get('/views/login', checkAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.get('/handleFailure',(req, res)=>{
res.render('loginFailed.ejs')
})

app.post('/views/login', checkAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/handleFailure',
    failureFlash: true
}))

app.get('/views/register', checkAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/api/v1/register', validateCredentials,async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.render("registerSuccess.ejs")
    } catch (error) {
        res.redirect('/views/register.ejs')
    }
    console.log(users)
})

app.delete('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/views/login')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/views/login')
}

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return res.redirect('/views/index')
    }
    next()
}

function validateCredentials(req, res, next){
    if (req.body.password.length <8) return "incorrect password give more than 8 "
    next()
}

app.listen(3000,()=>{
    console.log("listening at 3000 successfully...")
})
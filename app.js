const express = require('express')
const app = express()
const port = 11223
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// pasang mesin template
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.set('view engine', 'pug')

// app.use('/makasih', (req, res, next)=>{
//     console.log('one')
//     let errornya = new Error('waherornih')
//     next(errornya)
// })


// routes
// route index
app.get('/', (req, res)=>{
    if(req.cookies.username){
        res.locals.username = req.cookies.username
        res.render('index')
    }else{
        res.redirect('hello')
    }
})

app.post('/', (req, res)=>{
    res.clearCookie('username')
    res.redirect('/')
})

// route cards
app.get('/cards', (req, res)=>{
    // res.locals.pertanyaan = "ini pertanyaan nomor 2"
    // res.locals.hint = "ini pentunjuknya"
    // res.render('cards', {pertanyaan: "ini isi pertanyaannya"})
    res.locals = {
        pertanyaan: "ini pertanyaan 3",
        // hint: "ini petunjuknya yang ke 3"
        colors: ["red", "green", "blue"]
    }
    res.render('cards')
})

// route hello
app.get('/hello', (req, res)=>{
    // console.dir(req.cookies)
    if(!req.cookies.username){
        res.render('hello')
    }else{
        res.redirect('/')
    }
})
app.post('/hello', (req, res)=>{
    res.locals = {
        username: req.body.username
    }
    res.cookie('username', req.body.username)
    res.redirect('/')
    // res.send(username)
})

// app.use((err, req, res, next)=>{
//     res.send('error')
// })

app.listen(port, ()=>{
    console.log('welcome to server')
})
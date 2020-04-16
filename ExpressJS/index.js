const express = require('express')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.render('index', {name: 'Tu'}))
app.get('/users', (req, res) => res.render('users',{
    users: [
        {id: 1, name: 'Tu'},
        {id: 2, name:'Tuan'}
    ]
}))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
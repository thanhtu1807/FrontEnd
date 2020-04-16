const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('views', './views')
app.set('view engine', 'pug')

users = [
    {id: 1, name: 'Tu'},
    {id: 2, name:'Tuan'},
]
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.render('index', {name: 'Tu'}))

app.get('/users', (req, res) => res.render('users/index',{users: users,search: ''}))
app.get('/users/search', (req, res) => {
    const searchWord = req.query.q
    let matchedList = users.filter(user => user.name.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1)
    return res.render('users/index',{users: matchedList, search: searchWord})
})
app.get('/users/create', (req, res) => res.render('users/create'))
app.post('/users/create', (req, res) => {
    users.push(req.body)
    res.redirect('/users')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
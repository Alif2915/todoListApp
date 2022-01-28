const express = require('express');

const port = 3000;

const db = require('./config/mongoose');

const Task = require('./models/task');

const app = express();

app.use(express.static('./views'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    Task.find({}, (err, task) => {
        if (err){
            console.log('Error in fetching task');
            return;
        }
        res.render('home', {
            title: 'home',
            task: task
        });
    })
});

app.post('/create-task', (req, res) => {
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, (err, newTask) => {
        if (err){
            console.log('error in creating task', err);
            return;
        }
        res.redirect('back');
    });
});

app.get('delete-task', (req, res) => {
    let id = req.query;

    let count = object.keys(id).length;
    for (let i = 0; i < count; i++){
        Task.findByIdAndDelete(object.keys(id)[i], (err) => {
            if (err){
                console.log('error in deleting task');
            }
        })
    }
    res.redirect('back');
});

app.listen(port, (err) => {
    if (err) {
        console.log(`Error running the server : ${port}`);
    }
    console.log(`Server is running on port ${port}`);
})
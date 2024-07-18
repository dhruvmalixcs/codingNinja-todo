const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {Task} = require('../models/task.model');

router.use(bodyParser.json());

router.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOne({
        _id: req.params.taskId,
        listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

/* GET /lists/:listId/tasks : Get all the tasks belonging to a specific list */
router.get('/lists/:listId/tasks', (req,res) => {
    Task.find({listId: req.params.listId}).then((tasks) => {
        res.send(tasks);
    })
})

/* POST /lists/:listId/tasks : Create a new task in the specified list */
router.post('/lists/:listId/tasks', (req,res) => {
    const newTask = new Task({
        title: req.body.title,
        desc: req.body.desc,
        listId: req.params.listId,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status
    });

    newTask.save().then((newTaskDocument) => {
        res.send(newTaskDocument);
    })
})

/* PATCH /lists/:listId/tasks/:taskId : Update a specfic task in a specific list */
router.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        listId: req.params.listId
    },{ $set: req.body }).then(() => {
        res.send({message: 'Updated successfully'});
    })
})

/* DELETE /lists/:listId/tasks/:taskId : Delete a specific task from a specific list */
router.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        listId: req.params.listId
    }).then((removedTaskDocument) => {
        res.send(removedTaskDocument);
    })
})

module.exports = router;
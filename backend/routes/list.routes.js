const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {List} = require('../models/list.model');

router.use(bodyParser.json());

/* GET /lists: Get all the lists */
router.get('/lists', (req,res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

/* POST /lists: Create new list */
router.post('/lists', (req,res) => {
    const title = req.body.title;

    const newList = new List({
        title
    });

    newList.save().then((listDocument) => {
        res.send( listDocument);
    })
})

/* PATCH /lists: Update a specific list */
router.patch('/lists/:id', (req,res) => {
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({message: 'Updated successfully'});
    })
})

/* DELETE /lists: Delete a specified list */
router.delete('/lists/:id', (req,res) => {
    List.findOneAndDelete({
        _id: req.params.id
    }).then((removedListDocument) => {
        res.send(removedListDocument);
    })
})

module.exports = router;
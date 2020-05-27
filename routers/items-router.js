const router = require('express').Router();

const Items = require('./items-model');

router.get('/', (req, res) => {
    Items.find()
        .then(items => {
            res.status(200).json({ data: items })
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error retrieving list of items." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    
    Items.findById(id)
        .then(item => {
            if(item) {
                res.status(200).json({ data: item })
            } else {
                res.status(404).json({ message: "Item with specified ID was not found." })
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error retrieving item with specified ID." })
        })
})

router.post('/', validateItem, (req, res) => {
    const { name, durability, enhancement } = req.body;

    Items.forge({ name, durability, enhancement })
        .then(newItem => {
            if(newItem) {
                res.status(201).json({ data: newItem })
            } else {
                res.status(404).json({ message: "Newly forged item was not found." })
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error forging new item." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Items.destroy(id)
        .then(count => {
            if(count) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: "Item with specified ID was not found." })
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error destroying item with specified ID." })
        })
})

// Custom Middleware //

function validateItem(req, res, next) {
    const { name, durability, enhancement } = req.body;

    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No item data was provided." })
    } else if (!name || !durability || !enhancement) {
        res.status(400).json({ message: "Name, durability, and enhancement are all required fields." })
    } else {
        next();
    }
}

module.exports = router;
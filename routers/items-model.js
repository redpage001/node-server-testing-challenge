const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    forge,
    destroy
}

function find() {
    return db('items')
}

function findById(id) {
    return db('items')
        .where({ id: id })
        .first()
}

function forge(item) {
    return db('items')
        .insert(item, 'id')
        .then(([id]) => {
            return findById(id)
        })
}

function destroy(id) {
    return db('items')
        .where({ id: id })
        .del()
}
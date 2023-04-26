const mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    favoriteFood:{
        type: [String]
    }
})

module.exports = mongoose.model('Person', personSchema);
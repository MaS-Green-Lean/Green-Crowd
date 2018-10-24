import mongoose from 'mongoose'

var StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    }
})

var Store = mongoose.model('Store', StoreSchema)

module.exports = Store

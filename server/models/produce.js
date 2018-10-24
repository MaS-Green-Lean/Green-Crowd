import mongoose from 'mongoose'

var ProduceSchema = new mongoose.Schema({
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

var Produce = mongoose.Model('Produce', ProduceSchema)

module.exports = Produce

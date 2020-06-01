const mongoose = require('mongoose');

const BoletoSchema = new mongoose.Schema({
    numBoleto: {
        type: String,
        required: [true, 'Please add numbers'],
        unique: true,
        maxlength: [10, 'No more of 10 numbers']
    },
    numVIN:{
        type: String,
        required: true,
        maxlength: [10, 'No more of 10 numbers']
    },
    estado: {
        type: String,
        required: true,
        maxlength: [15, 'No more of 15 characters'] 
    }
})

module.exports = mongoose.models.Boleto || mongoose.model('Boleto',
BoletoSchema);
const mongoose =require('mongoose');

const familyModel= new mongoose.Schema({
    name: {
        type:String,
        required: 'This field is required.'
    },
    email: {
        type:String,
        required: 'This field is required.'
    },
    password: {
        type:String,
        required: 'This field is required.'
    }

})

const family=mongoose.model('User',familyModel);

module.exports=family
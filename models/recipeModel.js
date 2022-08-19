const mongoose =require('mongoose');

const foodModel= new mongoose.Schema({
    name: {
        type:String,
        required: 'This field is required.'
    },
    email: {
        type:String,
        required: 'This field is required.'
    },
    dishName: {
        type:String,
        required: 'This field is required.'
    },
    ingredients:{
        type:Array,
        required: 'This field is required.'
    },
    recipe:{
        type:String,
        required: 'This field is required.'
    },
    tags:{
        type:Array
    },
    category:{
        type:String,
        required: 'This field is required.',
        possibleValues: ["Classic","Fast Food","Dessert"]
    }
})

const american=mongoose.model('american',foodModel);
const thai=mongoose.model('thai',foodModel);
const indian=mongoose.model('indian',foodModel);
const mexican=mongoose.model('mexican',foodModel);
const chinese=mongoose.model('chinese',foodModel);
const pakistani=mongoose.model('pakistani',foodModel);
const others=mongoose.model('others',foodModel);
const desserts=mongoose.model('desserts',foodModel);
const classic=mongoose.model('classic',foodModel);
const fastfood=mongoose.model('fastfood',foodModel);

module.exports={
    american, thai, indian, mexican, chinese, desserts, pakistani, others,classic,fastfood
}
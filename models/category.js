const mongoose  = require("mongoose");
const { Schema } = mongoose;


const categorySchema = mongoose.Schema({
    categoryName:{
        type: String
    },
    icon : {
        type: String
    },
    color: {
        type: String
    }
});

exports.Category = mongoose.model('Category', categorySchema);
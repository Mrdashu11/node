import mongoose from "mongoose";

const movieSchema= new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    year :{
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    poster :{
        type:String
    }
},{timestamps:true})

const movie = mongoose.model("moviesdata",movieSchema)

export default movie
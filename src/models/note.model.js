import mongoose from "mongoose";
import { type } from "node:os";
import { title } from "node:process";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const noteModel = mongoose.model("Note",noteSchema);

export default noteModel;
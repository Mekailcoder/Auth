import express from "express";
import noteModel from "./models/note.model.js";
import  error  from "node:console";
// import json  from "body-parser";

const app = express();
app.use(express.json());

/*
@route POST /api/notes,
@description create a new note need title and description in request body
*/
app.post(`/api/notes`, async (req, res) => {
  const { title, description } = req.body;

  // ----validations---
  if (!title) {
    return res.status(400).json({
      error: `title is requierd`,
    });
  }

  if (!description) {
    return res.status(400).json({ error: `descripton is requierd` });
  }
  if(title.trim().length<3){
    return res.status(400),json({error:`title length must be 3`})
  }

    if(description.trim().length<9){
    return res.status(400),json({error:`description length must be 3`})
  }

  const newNote = noteModel.create({title,description})

  return res.status(201).json({
    Message:`note created successfully`,
    note:newNote
  })


});

export default app;

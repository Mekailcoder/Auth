import express from "express";
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json());

/*
@route POST /api/notes
@description Create a new note
*/
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    // validations
    if (!title) {
      return res.status(400).json({
        error: "title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        error: "description is required",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        error: "title length must be at least 3 characters",
      });
    }

    if (description.trim().length < 9) {
      return res.status(400).json({
        error: "description length must be at least 9 characters",
      });
    }

    const newNote = await noteModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "server error",
    });
  }
});

/*
@route GET /api/notes
@description Get all notes
*/
app.get("/api/notes", async (req, res) => {
  try {
    const allNotes = await noteModel.find();

    return res.status(200).json({
      message: "fetched all notes from database",
      notes: allNotes,
    });
  } catch (error) {
    console.log(`error from database ${error}`);

    return res.status(500).json({
      error: "server error",
    });
  }
});

/*
@route PATCH /api/notes
@description update data using Id
*/

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "description is required" });
    }

    if (description.trim().length < 9) {
      return res.status(400).json({ error: "description length must be > 9" });
    }
    const updateNote = await noteModel.findByIdAndUpdate(
      id,
      { description },
      { new: true },
    );
    if(!updateNote){
      return res.status(404).json({
        error: "Note not found"
      })
    }

    return res.status(200).json({
      message: "notes updated is successfully",
      updateNote,
    });
  } catch (error) {
    console.log("error form updated server:", error);
    return res.status(500).json({
      message:"Interneal server error"
    })
  }
});

export default app;

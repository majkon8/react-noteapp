module.exports = app => {
  const notes = require("./note.controller");
  // POST /notes - create new note
  app.post("/notes", notes.create);
  // GET /notes - get all notes
  app.get("/notes", notes.findAll);
  // GET /notes/:id - get one note
  app.get("/notes/:id", notes.findOne);
  // PUT /notes/:id  - update note
  app.put("/notes/:id", notes.update);
  // DELETE /notes/:id
  app.delete("/notes/:id", notes.delete);
};

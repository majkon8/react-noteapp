const Note = require("./note.model");

// CREATE NOTE
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Note cannot be empty"
    });
  }

  const note = new Note({
    title: req.body.title || "No title",
    content: req.body.content,
    tags: req.body.tags,
    lastUpdate: new Date()
  });

  note
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating the note."
      });
    });
};

// GET ALL NOTES
exports.findAll = (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while retrieving notes."
      });
    });
};

// GET ONE NOTE
exports.findOne = (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (!note) {
        throw "WrongId";
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err === "WrongId") {
        return res.status(404).send({
          message: `Note with id ${req.params.id} not found`
        });
      }
      return res.status(500).send({
        message: `Something went wrong with retreiving note with id ${
          req.params.id
        }`
      });
    });
};

// UPDATE NOTE
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Note cannot be empty"
    });
  }

  Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title || "No title",
      content: req.body.content,
      tags: req.body.tags,
      lastUpdate: new Date()
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        throw "WrongId";
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err === "WrongId") {
        return res.status(404).send({
          message: `Note with id ${req.params.id} not found`
        });
      }
      return res.status(500).send({
        message: `Something went wrong with updating note with id ${
          req.params.id
        }`
      });
    });
};

// DELETE NOTE
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(note => {
      if (!note) {
        throw "WrongId";
      }
      res.send({ message: "Note deleted successfully" });
    })
    .catch(err => {
      if (
        err.kind === "ObjectId" ||
        err.name === "NotFound" ||
        err === "WrongId"
      ) {
        return res.status(404).send({
          message: `Note with id ${req.params.id} not found`
        });
      }
      return res.status(500).send({
        message: `Could not delete product with id ${req.params.id}`
      });
    });
};

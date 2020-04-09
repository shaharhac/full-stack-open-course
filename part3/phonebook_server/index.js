require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("person", req => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status - :total-time ms :person"));

app.get("/info", (req, res) => {
  Person.countDocuments({}).then(count => {
    const info = `<div>Phonebook has info for ${count} people</div><div>${new Date()}</div>`;

    res.send(info);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: "'name' parameter is missing" });
  }

  if (!number) {
    return res.status(400).json({ error: "'number' parameter is missing" });
  }

  const personToCreate = new Person({
    name,
    number
  });

  personToCreate
    .save()
    .then(result => {
      res.json(result.toJSON());
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const updatedPerson = req.body;
  Person.findByIdAndUpdate(id, updatedPerson, { new: true }).then(person => {
    res.json(person.toJSON());
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

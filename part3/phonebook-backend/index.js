const express = require("express");

const morgan = require("morgan");
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId = Math.floor(Math.random() * 6000);
  return maxId;
};

app.get("/info", (req, res) => {
  const countPersons = persons.length;
  const requestTime = new Date();
  res.send(
    `<p>Phonebook has info for ${countPersons} people </p> <p>${requestTime}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json(`Not found person with id ${id}`);
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const person = persons.find((person) => person.name === body.name);

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (person) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server runnig in port ${PORT}`);

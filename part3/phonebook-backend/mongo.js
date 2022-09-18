/* eslint-disable no-undef */
const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log(
    "Please, provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
// eslint-disable-next-line no-redeclare
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://mardbrito:${password}@mernapp.np9bcb5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook");
    result.forEach((person) => {
      console.log(person.name, person.number);
      mongoose.connection.close();
    });
  });
}

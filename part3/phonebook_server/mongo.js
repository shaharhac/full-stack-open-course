const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0-xoft8.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (!name && !number) {
  Person.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });

    mongoose.connection.close();
  });
} else {
  const personToCreate = new Person({
    name,
    number
  });

  personToCreate.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}

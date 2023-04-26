const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./Person');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Create and Save a Record of a Model
let newPerson = new Person({
  name: 'hasen',
  age: 22,
  favoriteFood: ['ma9rouna', 'keftaji', 'couscous bl 3osben']
})
newPerson.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })


// Create Many Records with model.create()
const arrayOfPeople = [
    { name: 'John', age: 30, favoriteFood: ['burger', 'fries'] },
    { name: 'Jane', age: 25, favoriteFood: ['pizza', 'pasta']  },
    { name: 'Bob', age: 40, favoriteFood: ['suchi', 'fish']  }
  ];

  Person.create(arrayOfPeople)
  .then(function(People) {
    console.log('Created:', People);
  })
  .catch(function(err) {
    console.error(err);
  });

// Use model.find() to Search Your Database
  const nameToFind = 'John';

Person.find({ name: nameToFind })
.then(function(Person) {
    if (Person){
        console.log(`Found ${Person.length} people with the name ${nameToFind}:`, Person)
    }})
.catch(function(err) {
        console.error(err);
    });

    // Use model.findOne() to Return a Single Matching Document from Your Database
    Person.findOne({ age: '22' })
.then(function(Person) {
    if (Person){
        console.log(Person.name ,'is 22 years old')
    }})
.catch(function(err) {
        console.error(err);
    });


// Use model.findById() to Search Your Database By _id
    Person.findById('643f02176622c6a144a8f5e7')
  .then(function(Person) {
    if (Person) {
      console.log('Found a person with this ID ', Person.id);
      console.log(Person);
    } else {
      console.log('Could"nt find a person with this ID ', Person.id);
    }
  })
  .catch(function(err) {
    console.error(err);
  });

  // Perform Classic Updates by Running Find, Edit, then Save
  Person.findById('643f02176622c6a144a8f5e7')
  .then((Person) => {
      Person.favoriteFood.push('hamburger');
      return Person.save();
    })
  .catch((err) => {
    console.error(err);
  });



  //Perform New Updates on a Document Using model.findOneAndUpdate()
  Person.findOneAndUpdate(
    { name: 'John' },
    { age: 20 },
    { new: true }
  )
    .then((Person) => {
        console.log(Person, Person.name, 'is now 20 years old');
    })
    .catch((err) => {
      console.error(err);
    });



  // Delete One Document Using model.findByIdAndRemove
  Person.findByIdAndRemove('64401e1512de61a1feac5d3f')
  .then((Person) => {
    console.log(Person, Person.name, 'is removed successfully');
  })
  .catch((err) => {
        console.error(err);
    });


  // MongoDB and Mongoose - Delete Many Documents with model.remove()
  const query = {name: 'John'};
  Person.deleteMany(query)
  .then((Person) => {
    console.log(result.deletedCount, Person, 'is deleted successfully');
  })
  .catch((err) => {
    console.error(err);
  });


  // Chain Search Query Helpers to Narrow Search Results
  Person.find({ favoriteFood: 'ma9rouna' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    let newRecipe =   {
      title: "Strange Pork",
      level: "UltraPro Chef",
      ingredients: [
        "3 pork shoulders, cut into large pieces",
        "2 bay leaves",
        "4 teaspoon of fire pepper",
      ],
      cuisine: "American",
      dishType: "main_course",
      image: "https://www.seriouseats.com/thmb/SjluUURS-0IJ6exFRilzWkkOIZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__20100427-nasty-bits-pigs-head-3a0dacc42d864d648c4745863e83d33c.jpg",
      duration: 160,
      creator: "Chef John"
    }
    await Recipe.create(newRecipe);
    console.log("Strange Pork");
    let allRecipes = await Recipe.insertMany(data)
    for (let i = 0; i < allRecipes.length; i++)
    console.log(allRecipes[i].title)
//----------------------------
let updateRecipe = await Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
 { duration: 100 }
);
console.log(updateRecipe);

let deletedRecipe = await Recipe.deleteOne ({title: 'Carrot Cake'})
console.log(deletedRecipe)
console.log("success")

mongoose.disconnect()  
  
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

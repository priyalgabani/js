const express = require('express');
const check = require('./middle');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to the Recipe API');
});
 

app.get('/recipe/all', (req, res) => {
    res.status(200).send(initialRecipe)
    console.log(initialRecipe);
}); 

app.get('/index', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/recipe.html');
});

app.post('/recipe/add',check, (req, res) => {
    const newRecipe = {
      name: req.body.name,
      description: req.body.description,
      preparationTime: req.body.preparationTime,
      cookingTime: req.body.cookingTime,
      imageUrl: req.body.imageUrl,
      country: req.body.country,
      veg: req.body.veg === 'on', 
      id: initialRecipe.length + 1 
    };
  
    initialRecipe.push(newRecipe);
    res.json(initialRecipe); 
  });

app.patch("/recipe/update/:id",(req,res)=>{
    let {id}=req.params
    
    let update=initialRecipe.filter(recipe=>recipe.id==id)

    update[0].name=req.body.name
    update[0].description=req.body.description
    update[0].preparationTime=req.body.preparationTime
    update[0].cookingTime=req.body.cookingTime
    update[0].imageUrl=req.body.imageUrl
    update[0].country=req.body.country
    update[0].veg=req.body.veg

    res.status(200).send(initialRecipe)
})

app.delete('/recipe/delete/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    let datadelete = initialRecipe.filter(student => student.id != id);
    res.send(datadelete);
    console.log(datadelete);
});
app.get('/recipe/filter', (req, res) => {
    const { veg, sort, country } = req.query;
    let filteredRecipes = initialRecipe;
    if (veg === 'true') {
        filteredRecipes = filteredRecipes.filter(initialRecipe => initialRecipe.veg === true);
    } else if (veg === 'false') {
        filteredRecipes = filteredRecipes.filter(initialRecipe => initialRecipe.veg === false);
    }

    if (country) {
        filteredRecipes = filteredRecipes.filter(initialRecipe => initialRecipe.country === country);
    }

    if (sort === 'lth') {
        filteredRecipes.sort((a, b) => a.name - (b.name));
    } else if (sort === 'htl') {
        filteredRecipes.sort((a, b) => b.name - (a.name));
    }


    res.json(filteredRecipes);
});
const port = 8090;
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})
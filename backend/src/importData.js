import request from 'request-promise-native';
import models from './models';

const startRecipeId = 1;
const startIngredientId = 1;
const numSearch = 2;
const resetDatabase = false;

const doImport = async () => {
    try {
        const { recipes } = await request({
            uri: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=${numSearch}`,
            headers: {
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'X-RapidAPI-Key': 'acbac90c5emshbe76c8c442f7faap19c0a2jsn4091616a66ba',
            },
            json: true,
        });

        let nextRecipeId = startRecipeId;
        let nextIngredientId = startIngredientId;
        const foundIngredients = {};

        const createRecipes = [];
        const createIngredients = [];
        const createRecipeIngredients = [];

        console.log('Got recipes');

        recipes.forEach((recipe) => {
            // Recipe

            const recipeId = nextRecipeId++;

            const recipeData = {
                id: recipeId,
                name: recipe.title,
                steps: recipe.analyzedInstructions
                    ? recipe.analyzedInstructions[0].steps.map(({ step }) => step)
                    : recipe.instructions.split(/\s*\.\s*/),
                description: recipe.creditText,
                rating: recipe.healthScore,
                imgURL: recipe.image,
                tags: [],
                preparationMinutes: recipe.preparationMinutes,
                cookingMinutes: recipe.cookingMinutes,
                servings: recipe.servings,
            };

            if (recipe.vegetarian) recipeData.tags.push('vegetarian');
            if (recipe.vegan) recipeData.tags.push('vegan');
            if (recipe.glutenFree) recipeData.tags.push('glutenFree');
            if (recipe.dairyFree) recipeData.tags.push('dairyFree');

            recipe.dishTypes.forEach((dishType) => {
                recipeData.tags.push(dishType);
            });

            createRecipes.push(recipeData);

            // Ingredients

            const linkedIngredients = {};

            recipe.extendedIngredients.forEach((ingredient) => {
                let ingredientId = foundIngredients[ingredient.name];

                if (!ingredientId) {
                    ingredientId = nextIngredientId++;

                    const ingredientData = {
                        id: ingredientId,
                        name: ingredient.name,
                    };

                    foundIngredients[ingredientData.name] = ingredientId;
                    createIngredients.push(ingredientData);
                }

                if (!linkedIngredients[ingredientId]) {
                    linkedIngredients[ingredientId] = true;
                    createRecipeIngredients.push({ recipeId, ingredientId, quantity: ingredient.amount, unit: ingredient.unit });
                }
            });

            // Recipe Ingredients
        });

        console.log(createIngredients);
        console.log(createRecipes);
        console.log(createRecipeIngredients);

        await models.Ingredient.bulkCreate(createIngredients, { ignoreDuplicates: true });

        await models.Recipe.bulkCreate(createRecipes, { ignoreDuplicates: true });

        await models.RecipeIngredient.bulkCreate(createRecipeIngredients);
    } catch (err) {
        console.log('DoImport Error:', err);
    }
};

doImport();

models.sequelize.sync({ force: resetDatabase }).catch(console.error);

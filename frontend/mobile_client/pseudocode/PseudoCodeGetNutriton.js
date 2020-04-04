/**
 * JavScript psuedo code
Recipes show the total nutritional information of ingredients used
Search recipes based on ingredients entered
Recipes should include instructions on how to make them
*/

// Recipes show the total nutritional information of ingredients used
fat: undefined
carbohydrates: undefined
protein: undefined
sugar: undefined
salt: undefined
// Recipes should include instructions on how to make them
instructions: undefined
error: undefined


getRecipes() {
    foodName = text input 
    apiCall = fetch('APIName{foodName}')
    data = apiCall.JSON
    IF foodName is TRUE THEN 
        fat: data.fat
        carbohydrates: data.carbohydrates
        protein: data.protein
        sugar: data.sugar
        salt: data.salt
        instructions: data.instructions
    ELSE THEN
        fat: undefined
        carbohydrates: undefined
        protein: undefined
        sugar: undefined
        salt: undefined
        instructions: undefined
        error: 'Error'
}

// Search recipes based on ingredients entered
SET ingredients[] // Stores an array of the user inputs (List of ingredients)
SET recipes[] // Stores an array of the user inputs (List of ingredients)

searchRecipes(ingredients[]) {
    apiCall = fetch('APIName{ingredients[]}')
    data = apiCall.JSON
    IF data is empty THEN
        error: 'Found nothing'
    ELSE THEN
        recipes[] = data[]
    
}
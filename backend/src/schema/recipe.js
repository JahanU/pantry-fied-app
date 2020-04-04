export default `

    type Recipe {
        id: Int!
        name: String!
        description: String
        quantities: [RecipeIngredient!]!
        steps: [String!]!
        editors: [User!]!
        rating: Int
        imgURL: String
        fat: Int
        protein: Int
        sodium: Int
        calories: Int
        tags: [String!]
        preparationMinutes: Int
        cookingMinutes: Int
        servings: Int
        matchScore: Int
    }

    type RecipeIngredient {
        ingredient: Ingredient!
        quantity: Int!
        unit: String
    }

    input RecipeIngredientRaw {
        ingredientId: Int!
        quantity: Int!
        unit: String
    }

    type CreateRecipeResponse {
        ok: Boolean!
        recipe: Recipe
        errors: [Error!]
    }

    type Query {
        getRecipes(ingredientsRaw: [Int!]): [Recipe!]!
    }

    type Mutation {
        createRecipe(name: String!, quantitiesRaw: [RecipeIngredientRaw!], steps: [String!], editors: [Int!], description: String, rating: Int, imgURL: String, fat: Int, protein: Int, sodium: Int, calories: Int, testing: Int): CreateRecipeResponse!
        addRecipeIngredient(recipeId: Int!, ingredientId: Int!, quantity: Int!, unit: String): CreateRecipeResponse!
    }

`;

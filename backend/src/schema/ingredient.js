export default `

    type Ingredient {
        id: Int!
        name: String!
    }

    type CreateIngredientResponse {
        ok: Boolean!
        ingredient: Ingredient
        errors: [Error!]
    }

    type Query {
        getIngredients: [Ingredient!]!
    }

    type Mutation {
        createIngredient(name: String!, testing: Int): CreateIngredientResponse!
    }

`;

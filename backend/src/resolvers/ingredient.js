import formatErrors from '../formatErrors';
import { requiresAuth } from '../permissions';

export default {
    Query: {
        getIngredients: async (parent, args, { models }) => {
            const ingredients = models.Ingredient.findAll({});

            return ingredients;
        },
    },
    Mutation: {
        createIngredient: requiresAuth.createResolver(async (parent, args, { models }) => {
            try {
                const ingredient = await models.Ingredient.create({
                    ...args,
                });

                return { ok: true, ingredient };
            } catch (err) {
                return { ok: false, errors: formatErrors(err, models) };
            }
        }),
    },
};

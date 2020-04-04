import formatErrors from '../formatErrors';
import { login } from '../auth';

export default {
    Query: {
        allUsers: (parent, args, { models }) => models.User.findAll({}),
    },
    Mutation: {
        register: async (parent, args, { models }) => {
            try {
                const user = await models.User.create(args);

                return {
                    ok: true,
                    user,
                };
            } catch (err) {
                console.log('Mutation_Register', err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        },
        login: (parent, args, { models, SECRETS }) => login(args, models, SECRETS),
    },
};

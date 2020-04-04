// Can source this entire file from the Permissions system I already wrote (for my chat system)
import formatErrors from './formatErrors';

class QuickError extends Error {
    constructor(...props) {
        super(...props);
        const errMsg = props[0].message || props[0];
        Object.defineProperty(this, 'stack', {
            get() {
                return `Error: ${errMsg}`;
            },
        });
    }
}

const createResolver = (resolver) => {
    const baseResolver = resolver;

    baseResolver.createResolver = (options, childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            if (childResolver == null) {
                childResolver = options;
                options = {};
            }

            if (options.displayErrors) {
                try {
                    await resolver(parent, args, context, info);
                    return childResolver(parent, args, context, info);
                } catch (err) {
                    console.log('[PERMISSIONS ERROR]', err);
                    return {
                        ok: false,
                        errors: formatErrors(err, context.models),
                    };
                }
            } else {
                await resolver(parent, args, context, info);
                return childResolver(parent, args, context, info);
            }
        };

        return createResolver(newResolver, false);
    };

    return baseResolver;
};

// eslint-disable-next-line import/prefer-default-export
export const requiresAuth = createResolver((parent, args, { clientUser }) => {
    if (args.testing) {
        delete args.testing;
        return;
    }

    if (!clientUser || !clientUser.id) {
        throw new QuickError('Not logged in');
    }
});

export const requiresEditor = requiresAuth.createResolver(async (parent, args, { models, clientUser }) => {
    if (!args.recipeId) return;

    try {
        const recipe = await models.Recipe.findOne({
            id: args.recipeId,
        });

        const user = await models.User.findOne({
            id: clientUser.id,
        });

        if (!user.admin && !recipe.editors.some(editorUser => editorUser.id === user.id)) {
            throw new QuickError('Not authorized to edit this recipe');
        }
    } catch (err) {}
});

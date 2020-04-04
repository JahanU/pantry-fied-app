import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';
import formatErrors from './formatErrors';

/*

    How we gonna do this:

    -args: { userKey: '...', password: '...' }
    -check whether userKey is username or email by checking for '@'
    -compare bcrypt (hashed) password
    -return jwt token to frontend (mobile) client

    -creating token stuff:
        -client id
        -client secret
        -token: expires after 1h
        -refreshToken: expires after 7d
        -(same as in chat project)

*/

export const createTokens = (user, SECRETS) => {
    const token = jwt.sign({ user: pick(user, ['id', 'username']) }, SECRETS.tokenSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ user: pick(user, 'id') }, SECRETS.refreshTokenSecret, { expiresIn: '7d' });

    return { token, refreshToken };
};

export const refreshTokens = async (refreshToken, models, SECRETS) => {
    let userId = 0;

    try {
        ({
            user: { userId },
        } = jwt.decode(refreshToken));
    } catch (err) {
        return {};
    }

    if (!userId) return {};

    const user = await models.User.findOne({ where: { id: userId } });

    if (!user) return {};

    const refreshTokenSecret = user.password + SECRETS.refreshTokenSecret;

    try {
        jwt.verify(refreshToken, refreshTokenSecret);
    } catch (err) {
        return {};
    }

    const { token: newToken, refreshToken: newRefreshToken } = createTokens(user, {
        tokenSecret: SECRETS.tokenSecret,
        refreshTokenSecret,
    });

    return {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
    };
};

export const login = async ({ userKey, password }, models, SECRETS) => {
    try {
        const userKeyType = userKey.includes('@') ? 'email' : 'username';

        const user = await models.User.findOne({ where: { [userKeyType]: userKey } });

        if (!user) {
            return {
                ok: false,
                errors: [{ path: 'user', message: 'Account does not exist' }],
            };
        }

        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass) {
            return {
                ok: false,
                errors: [{ path: 'password', message: 'Incorrect password' }],
            };
        }

        const refreshTokenSecret = user.password + SECRETS.refreshTokenSecret;

        const { token, refreshToken } = createTokens(user, {
            tokenSecret: SECRETS.tokenSecret,
            refreshTokenSecret,
        });

        return {
            ok: true,
            user,
            token,
            refreshToken,
        };
    } catch (err) {
        console.log('Mutation_Login', err);
        return {
            ok: false,
            errors: formatErrors(err, models),
        };
    }
};

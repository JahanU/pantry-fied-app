import bcrypt from 'bcryptjs';

const toMap = arr => arr.reduce((o, val) => {
    o[val] = true;
    return o;
}, {});

export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: 'The username can only contain letters and numbers',
                    },
                    len: {
                        args: [2, 25],
                        msg: 'The username needs to be between 2 and 25 characters long',
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Invalid email',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [5, 100],
                        msg: 'The password needs to be between 5 and 100 characters long',
                    },
                },
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            hooks: {
                afterValidate: async (user) => {
                    const changedCols = toMap(user.changed());

                    if (changedCols.password) {
                        const hashedPassword = await bcrypt.hash(user.password, 5);
                        user.password = hashedPassword;
                    }
                },
            },
        },
    );

    User.associate = (models) => {
        User.belongsToMany(models.Recipe, {
            through: models.RecipeUser,
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
    };

    return User;
};

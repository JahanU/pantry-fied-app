export default (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define('recipeingredient', {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        unit: {
            type: DataTypes.STRING,
        },
    });

    return RecipeIngredient;
};

export default (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('ingredient', {
        name: {
            type: DataTypes.STRING(1000),
            unique: true,
        },
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Recipe, {
            through: models.RecipeIngredient,
            foreignKey: {
                name: 'ingredientId',
                field: 'ingredient_id',
            },
        });
    };

    return Ingredient;
};

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define('item', {
        Name: { type: Sequelize.TEXT },
        ItemType: { type: Sequelize.INTEGER, references: {
            model: 'itemTypes',
            key: 'id'
        } },
        Source: { type: Sequelize.TEXT },
        Location: { type: Sequelize.INTEGER, references: {
            model: 'locations',
            key: 'id'
        } },
        Price: { type: Sequelize.INTEGER },
        FavoriteOf: { type: Sequelize.TEXT },
        Effects: { type: Sequelize.TEXT }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return Item;
}
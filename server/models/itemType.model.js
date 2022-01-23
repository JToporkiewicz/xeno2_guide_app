module.exports = (sequelize, Sequelize) => {
    const ItemType = sequelize.define('itemType', {
        ItemType: { type: Sequelize.TEXT }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return ItemType;
}
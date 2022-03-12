module.exports = (sequelize, Sequelize) => {
  const AffinityChartBranch = sequelize.define('affinityChartBranch', {
    BranchName: { type: Sequelize.TEXT },
    NodeAffinity1: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'affinityChartNodes',
        key: 'id'
      }
    },
    NodeAffinity2: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'affinityChartNodes',
        key: 'id'
      }
    },
    NodeAffinity3: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'affinityChartNodes',
        key: 'id'
      }
    },
    NodeAffinity4: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'affinityChartNodes',
        key: 'id'
      }
    },
    NodeAffinity5: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'affinityChartNodes',
        key: 'id'
      }
    }
  },
  {timestamps: false, createdAt: false, updatedAt: false}
  );
  return AffinityChartBranch
}
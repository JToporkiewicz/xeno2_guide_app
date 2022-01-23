module.exports = (sequelize, Sequelize) => {
    const AffinityChart = sequelize.define('affinityChart', {
        AffinityBranch: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BladeSpecialBranch1: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BladeSpecialBranch2: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BladeSpecialBranch3: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BattleSkillBranch1: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BattleSkillBranch2: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        BattleSkillBranch3: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        FieldSkillBranch1: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        FieldSkillBranch2: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        },
        FieldSkillBranch3: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'affinityChartBranches',
                key: 'id'
            }
        }
        },
        {timestamps: false, createdAt: false, updatedAt: false}
    );

    return AffinityChart;
}
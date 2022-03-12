const updateBranchDSN = {
  name: 'updateBranchDSN',
  query: `CREATE PROCEDURE updateBranchDSN(
        IN skillId INT
    )
    BEGIN
        DECLARE chartId INT;

        SELECT dst.id INTO chartId
        FROM xenoblade2_guide.driverskilltrees as dst
        WHERE dst.Tier1Branch1 = skillId
        OR dst.Tier1Branch2 = skillId
        OR dst.Tier1Branch3 = skillId
        OR dst.Tier1Branch4 = skillId
        OR dst.Tier1Branch5 = skillId
        OR dst.Tier2Branch1 = skillId
        OR dst.Tier2Branch2 = skillId
        OR dst.Tier2Branch3 = skillId
        OR dst.Tier2Branch4 = skillId
        OR dst.Tier2Branch5 = skillId
        OR dst.Tier3Branch1 = skillId
        OR dst.Tier3Branch2 = skillId
        OR dst.Tier3Branch3 = skillId
        OR dst.Tier3Branch4 = skillId
        OR dst.Tier3Branch5 = skillId;

        UPDATE xenoblade2_guide.driverskillnodes as dsn
        SET dsn.Unlocked = 1
        WHERE (dsn.id = skillId - 5
            OR dsn.id = skillId - 10)
        AND ((
            SELECT dst.id
            FROM xenoblade2_guide.driverskilltrees as dst
            WHERE (dst.Tier1Branch1 = dsn.id
                OR dst.Tier1Branch2 = dsn.id
                OR dst.Tier1Branch3 = dsn.id
                OR dst.Tier1Branch4 = dsn.id
                OR dst.Tier1Branch5 = dsn.id
                OR dst.Tier2Branch1 = dsn.id
                OR dst.Tier2Branch2 = dsn.id
                OR dst.Tier2Branch3 = dsn.id
                OR dst.Tier2Branch4 = dsn.id
                OR dst.Tier2Branch5 = dsn.id
                OR dst.Tier3Branch1 = dsn.id
                OR dst.Tier3Branch2 = dsn.id
                OR dst.Tier3Branch3 = dsn.id
                OR dst.Tier3Branch4 = dsn.id
                OR dst.Tier3Branch5 = dsn.id)
            AND dst.id = chartId
        ) IS NOT NULL);

        UPDATE xenoblade2_guide.driverskillnodes as dsn
        SET dsn.Unlocked = 0
        WHERE (dsn.id = skillId + 5
            OR dsn.id = skillId + 10)
        AND ((
            SELECT dst.id
            FROM xenoblade2_guide.driverskilltrees as dst
            WHERE (dst.Tier1Branch1 = dsn.id
                OR dst.Tier1Branch2 = dsn.id
                OR dst.Tier1Branch3 = dsn.id
                OR dst.Tier1Branch4 = dsn.id
                OR dst.Tier1Branch5 = dsn.id
                OR dst.Tier2Branch1 = dsn.id
                OR dst.Tier2Branch2 = dsn.id
                OR dst.Tier2Branch3 = dsn.id
                OR dst.Tier2Branch4 = dsn.id
                OR dst.Tier2Branch5 = dsn.id
                OR dst.Tier3Branch1 = dsn.id
                OR dst.Tier3Branch2 = dsn.id
                OR dst.Tier3Branch3 = dsn.id
                OR dst.Tier3Branch4 = dsn.id
                OR dst.Tier3Branch5 = dsn.id)
            AND dst.id = chartId
        ) IS NOT NULL);

    END`
}

const update_dsn_procedures = [
  updateBranchDSN
]

module.exports = update_dsn_procedures
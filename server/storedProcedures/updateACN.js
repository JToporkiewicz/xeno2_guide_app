const updateACNPart1 = {
  name: 'updateACNPart1',
  query: `CREATE PROCEDURE updateACNPart1()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableACNPart1;

        CREATE temporary TABLE xenoblade2_guide._unavailableACNPart1
        SELECT preACN.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesACNs as preACN
        WHERE (preACN.StoryProgress > current_chapter
            AND preACN.StoryProgress IS NOT NULL)
        OR (preACN.DLCRequired > (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preACN.DLCRequired IS NOT NULL)
        OR (preACN.Location NOT IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
            ) AND preACN.Location IS NOT NULL)
        OR (preACN.PouchItem NOT IN (
            SELECT item.id
            FROM xenoblade2_guide.items as item
            WHERE item.Location IN (
                SELECT id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter)
        ) AND preACN.PouchItem IS NOT NULL)
        OR (preACN.PouchItemType NOT IN (
            SELECT id
            FROM xenoblade2_guide.items as item
            WHERE item.Location IN (
                SELECT id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter)
        ) AND preACN.PouchItemType IS NOT NULL)
        OR (preACN.MonsterTitle IN (
            SELECT id
            FROM xenoblade2_guide.monsters as monster
            WHERE monster.Available = 0
        ) AND preACN.MonsterTitle IS NOT NULL)
        OR (preACN.MonsterType IN (
            SELECT Type
            FROM xenoblade2_guide.monsters as monster
            WHERE monster.Available = 0
        ) AND preACN.MonsterType IS NOT NULL)
        OR (preACN.MercMissionTitle IN (
            SELECT id
            FROM xenoblade2_guide.mercMissions as mm
            WHERE mm.Available = 0
        ) AND preACN.MercMissionTitle IS NOT NULL);

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Available = 1
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart1
        )
        OR id NOT IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesACNs as preACN
        );

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Available = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart1
        );

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Unlocked = 0
        WHERE (id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart1
        ) AND 0 = (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        )) OR id IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesACNs as preACN
            WHERE preACN.DLCRequired > (
                SELECT sp.DLCUnlocked
                FROM xenoblade2_guide.storyProgresses as sp
                WHERE sp.id = 1
            ) AND preACN.DLCRequired IS NOT NULL
        );

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableACNPart2;

        CREATE temporary TABLE xenoblade2_guide._unavailableACNPart2
        SELECT preACN.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesACNs as preACN
        WHERE preACN.AffinityChartNode IN (
            SELECT id
            FROM xenoblade2_guide.affinityChartNodes as acn
            WHERE acn.Unlocked = 0
        ) AND preACN.AffinityChartNode IS NOT NULL;

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Available = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart2
        );

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Unlocked = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart2
        ) AND 0 = (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        );

        UPDATE xenoblade2_guide.prerequisitesACNs as preACN
        SET Progress = (preACN.Progress - 1)
        WHERE preACN.Progress = preACN.OtherPrerequisiteDetail
        AND preACN.RequiredBy IN (
            SELECT id
            FROM xenoblade2_guide.affinityChartNodes as acn
            WHERE acn.Unlocked = 0
        );

    END`
}

const updateACNPart2 = {
  name: 'updateACNPart2',
  query: `CREATE PROCEDURE updateACNPart2()
    BEGIN
        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableACNPart3;

        CREATE temporary TABLE xenoblade2_guide._unavailableACNPart3
        SELECT preACN.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesACNs as preACN
        WHERE (preACN.Heart2HeartTitle IN (
            SELECT id
            FROM xenoblade2_guide.heart2Hearts as h2h
            WHERE h2h.Available = 0
        ) AND preACN.Heart2HeartTitle IS NOT NULL)
        OR (preACN.SideQuest IN (
            SELECT id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 0
        ) AND preACN.SideQuest IS NOT NULL);

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Available = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart3
        );

        UPDATE xenoblade2_guide.affinityChartNodes
        SET Unlocked = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableACNPart3
        ) AND 0 = (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        );

    END`
}

const updateBranchACN = {
  name: 'updateBranchACN',
  query: `CREATE PROCEDURE updateBranchACN(
        IN skillId INT
    )
    BEGIN
        DECLARE branchId INT;
        DECLARE lowestNode INT;
        DECLARE highestNode INT;

        SELECT acb.id INTO branchId
        FROM xenoblade2_guide.affinityChartBranches as acb
        WHERE acb.NodeAffinity1 = skillId
        OR acb.NodeAffinity2 = skillId
        OR acb.NodeAffinity3 = skillId
        OR acb.NodeAffinity4 = skillId
        OR acb.NodeAffinity5 = skillId;

        SELECT MIN(id), MAX(id) INTO lowestNode, highestNode
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.id > skillId - 5
        AND acn.id < skillId + 5
        AND acn.Name = (
            SELECT acb.BranchName as Name
            FROM xenoblade2_guide.affinityChartBranches as acb
            WHERE acb.id = branchId
        );

        UPDATE xenoblade2_guide.affinityChartNodes as acn
        SET acn.Available = 1
        WHERE acn.id >= lowestNode
        AND acn.id < skillId;

        UPDATE xenoblade2_guide.affinityChartNodes as acn
        SET acn.Available = 0
        WHERE acn.id > skillId
        AND acn.id <= highestNode;

    END`
}

const lockBladesACN = {
  name: 'lockBladesACN',
  query: `CREATE PROCEDURE lockBladesACN()
    BEGIN
        DROP temporary TABLE IF EXISTS xenoblade2_guide._filteredACNLock;

        CREATE temporary TABLE xenoblade2_guide._filteredACNLock
        SELECT acn.*
        FROM xenoblade2_guide.blades as b
            JOIN xenoblade2_guide.affinityCharts as ac
                ON b.AffinityChart = ac.id
                AND b.Unlocked = 0
            JOIN xenoblade2_guide.affinityChartBranches as acb
                ON ac.AffinityBranch = acb.id
                OR ac.BladeSpecialBranch1 = acb.id
                OR ac.BladeSpecialBranch2 = acb.id
                OR ac.BladeSpecialBranch3 = acb.id
                OR ac.BattleSkillBranch1 = acb.id
                OR ac.BattleSkillBranch2 = acb.id
                OR ac.BattleSkillBranch3 = acb.id
                OR ac.FieldSkillBranch1 = acb.id
                OR ac.FieldSkillBranch2 = acb.id
                OR ac.FieldSkillBranch3 = acb.id
            JOIN xenoblade2_guide.affinityChartNodes as acn
                ON acb.NodeAffinity1 = acn.id
                OR acb.NodeAffinity2 = acn.id
                OR acb.NodeAffinity3 = acn.id
                OR acb.NodeAffinity4 = acn.id
                OR acb.NodeAffinity5 = acn.id;
        
        UPDATE xenoblade2_guide.affinityChartNodes as acnList
        SET acnList.Available = 0, acnList.Unlocked = 0
        WHERE acnList.id IN ( SELECT id FROM xenoblade2_guide._filteredACNLock );
        
        DROP temporary TABLE IF EXISTS xenoblade2_guide._filteredACNLock;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._filteredACNUnlock;
        CREATE temporary TABLE xenoblade2_guide._filteredACNUnlock
        SELECT acn.id
        FROM xenoblade2_guide.blades as b
            JOIN xenoblade2_guide.affinityCharts as ac
            ON b.AffinityChart = ac.id
            AND b.Unlocked = 1
            JOIN xenoblade2_guide.affinityChartBranches as acb
            ON ac.AffinityBranch = acb.id
            OR ac.BladeSpecialBranch1 = acb.id
            OR ac.BladeSpecialBranch2 = acb.id
            OR ac.BladeSpecialBranch3 = acb.id
            OR ac.BattleSkillBranch1 = acb.id
            OR ac.BattleSkillBranch2 = acb.id
            OR ac.BattleSkillBranch3 = acb.id
            OR ac.FieldSkillBranch1 = acb.id
            OR ac.FieldSkillBranch2 = acb.id
            OR ac.FieldSkillBranch3 = acb.id
            JOIN xenoblade2_guide.affinityChartNodes as acn
            ON (acb.NodeAffinity1 = acn.id
            OR acb.NodeAffinity2 = acn.id
            OR acb.NodeAffinity3 = acn.id
            OR acb.NodeAffinity4 = acn.id
            OR acb.NodeAffinity5 = acn.id)
            AND acn.id NOT IN (
                SELECT preACN.RequiredBy
                FROM xenoblade2_guide.prerequisitesACNs as preACN
            );
        
        UPDATE xenoblade2_guide.affinityChartNodes as acnList
        SET acnList.Available = 1, acnList.Unlocked = 1
        WHERE acnList.id IN ( SELECT * FROM xenoblade2_guide._filteredACNUnlock);
        
        DROP temporary TABLE IF EXISTS xenoblade2_guide._filteredACNUnlock;

        CALL updateAllFieldSkills();

    END`
}

const update_acn_procedures = [
  updateACNPart1,
  updateACNPart2,
  updateBranchACN,
  lockBladesACN
]

module.exports = update_acn_procedures
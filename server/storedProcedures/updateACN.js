const updateACN = {
  name: 'updateACN',
  query: `CREATE PROCEDURE updateACN()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableACN;

        CREATE temporary TABLE xenoblade2_guide._availableACN
        SELECT preACN.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesacns as preACN
        WHERE (preACN.StoryProgress <= current_chapter
            OR preACN.StoryProgress IS NULL)
        AND (preACN.Location IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
            ) OR preACN.Location IS NULL)
        AND (preACN.Heart2HeartTitle IN (
            SELECT id
            FROM xenoblade2_guide.heart2hearts as h2h
            WHERE h2h.Available = 1
        ) OR preACN.Heart2HeartTitle IS NULL)
        AND (preACN.SideQuest IN (
            SELECT id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
        ) OR preACN.SideQuest IS NULL)
        AND (preACN.MercMissionTitle IN (
            SELECT id
            FROM xenoblade2_guide.mercmissions as mm
            WHERE mm.Available = 1
        ) OR preACN.MercMissionTitle IS NULL)
        AND (preACN.MonsterTitle IN (
            SELECT id
            FROM xenoblade2_guide.monsters as monster
            WHERE monster.Available = 1
        ) OR preACN.MonsterTitle IS NULL)
        AND (preACN.AffinityChartNode IN (
            SELECT id
            FROM xenoblade2_guide.affinitychartnodes as acn
            WHERE acn.Available = 1
        ) OR preACN.AffinityChartNode IS NULL)
        AND (preACN.PouchItemType IN (
            SELECT id
            FROM xenoblade2_guide.items as item
            WHERE item.Location IN (
                SELECT id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter)
        ) OR preACN.PouchItemType IS NULL);

        UPDATE xenoblade2_guide.affinitychartnodes
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableACN
        )
        OR id NOT IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesacns as preACN
        );

        UPDATE xenoblade2_guide.affinitychartnodes
        SET Available = 0, Unlocked = 0
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableACN
        )
        AND id IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesacns as preACN
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
        FROM xenoblade2_guide.affinitychartbranches as acb
        WHERE acb.NodeAffinity1 = skillId
        OR acb.NodeAffinity2 = skillId
        OR acb.NodeAffinity3 = skillId
        OR acb.NodeAffinity4 = skillId
        OR acb.NodeAffinity5 = skillId;

        SELECT MIN(id), MAX(id) INTO lowestNode, highestNode
        FROM xenoblade2_guide.affinitychartnodes as acn
        WHERE acn.id > skillId - 5
        AND acn.id < skillId + 5
        AND acn.Name = (
            SELECT acb.BranchName as Name
            FROM xenoblade2_guide.affinitychartbranches as acb
            WHERE acb.id = branchId
        );

        UPDATE xenoblade2_guide.affinitychartnodes as acn
        SET acn.Available = 1
        WHERE acn.id >= lowestNode
        AND acn.id < skillId;

        UPDATE xenoblade2_guide.affinitychartnodes as acn
        SET acn.Available = 0
        WHERE acn.id > skillId
        AND acn.id <= highestNode;

    END`
}

const updateACNUnlocked = {
  name: 'updateACNUnlocked',
  query: `CREATE PROCEDURE updateACNUnlocked()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._completedACN;

        CREATE temporary TABLE xenoblade2_guide._completedACN
        SELECT preACN.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesacns as preACN
        WHERE (preACN.StoryProgress <= current_chapter
            OR preACN.StoryProgress IS NULL)
        AND (preACN.Location IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
            ) OR preACN.Location IS NULL)
        AND (preACN.Heart2HeartTitle IN (
            SELECT id
            FROM xenoblade2_guide.heart2hearts as h2h
            WHERE h2h.Viewed = 1
        ) OR preACN.Heart2HeartTitle IS NULL)
        AND (preACN.SideQuest IN (
            SELECT id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Status = 'FINISHED'
        ) OR preACN.SideQuest IS NULL)
        AND (preACN.MercMissionTitle IN (
            SELECT id
            FROM xenoblade2_guide.mercmissions as mm
            WHERE mm.Completed = 1
        ) OR preACN.MercMissionTitle IS NULL)
        AND (
            (preACN.MonsterTitle IN (
                SELECT id
                FROM xenoblade2_guide.monsters as monster
                WHERE monster.Available = 1
            ) AND preACN.OtherPrerequisiteDetail = preACN.Progress
        ) OR preACN.MonsterTitle IS NULL)
        AND (preACN.AffinityChartNode IN (
            SELECT id
            FROM xenoblade2_guide.affinitychartnodes as acn
            WHERE acn.Unlocked = 1
        ) OR preACN.AffinityChartNode IS NULL)
        AND (
            (preACN.PouchItemType IN (
                SELECT id
                FROM xenoblade2_guide.items as item
                WHERE item.Location IN (
                    SELECT id
                    FROM xenoblade2_guide.locations as loc
                    WHERE loc.StoryProgress <= current_chapter)
            ) AND preACN.OtherPrerequisiteDetail = preACN.Progress
        ) OR preACN.PouchItemType IS NULL)
        AND (preACN.OtherPrerequisiteDetail >= preACN.Progress
            OR preACN.OtherPrerequisiteDetail IS NULL);

        UPDATE xenoblade2_guide.affinitychartnodes
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._completedACN
        )
        OR id NOT IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesacns as preACN
        );

        UPDATE xenoblade2_guide.affinitychartnodes
        SET Available = 0
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._completedACN
        )
        AND id IN (
            SELECT preACN.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesacns as preACN
        );
    END`
}

const update_acn_procedures = [
  updateACN,
  updateBranchACN,
  updateACNUnlocked
]

module.exports = update_acn_procedures
const updateMM = {
  name: 'updateMM',
  query: `CREATE PROCEDURE updateMM()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableMM;

        CREATE temporary TABLE xenoblade2_guide._availableMM
        SELECT preMM.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesMMs as preMM, xenoblade2_guide.requirementsMMs as reqMM
        WHERE (preMM.Nation IN (
            SELECT ma.id
            FROM xenoblade2_guide.majorAreas as ma
            WHERE ma.StoryProgress <= current_chapter
        ) OR preMM.Nation IS NULL)
        AND (preMM.BladeUnlocked IN (
            SELECT blade.id
            FROM xenoblade2_guide.blades as blade
            WHERE blade.Available = 1
        ) OR preMM.BladeUnlocked IS NULL)
        AND (preMM.Quest IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
        ) OR preMM.Quest IS NULL)
        AND (preMM.StoryProgress <= current_chapter
            OR preMM.StoryProgress IS NULL)
        AND (preMM.DLCUnlocked <= (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) OR preMM.DLCUnlocked IS NULL)
        AND (preMM.id IN (
            SELECT reqMM.id
            FROM xenoblade2_guide.requirementsMMs as reqMM
            WHERE reqMM.Blade IN (
                SELECT blade.id
                FROM xenoblade2_guide.blades as blade
                WHERE blade.Available = 1
            )
        ) OR preMM.id NOT IN (
            SELECT reqMM.id
            FROM xenoblade2_guide.requirementsMMs as reqMM));

        UPDATE xenoblade2_guide.mercMissions
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableMM
        )
        OR id NOT IN (
            SELECT preMM.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesMMs as preMM
        );

        UPDATE xenoblade2_guide.mercMissions
        SET Available = 0, Completed = 0
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableMM
        )
        AND id IN (
            SELECT preMM.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesMMs as preMM
        );

    END`
}

const updateMMRelatedACN = {
  name: 'updateMMRelatedACN',
  query: `CREATE PROCEDURE updateMMRelatedACN()
    BEGIN
        UPDATE xenoblade2_guide.prerequisitesACNs as preACN
        SET preACN.Progress = 1
        WHERE preACN.MercMissionTitle IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercMissions as mm
            WHERE mm.Completed > 0
        ) AND preACN.MercMissionTitle IS NOT NULL;

        UPDATE xenoblade2_guide.prerequisitesACNs as preACN
        SET preACN.Progress = 0
        WHERE preACN.MercMissionTitle NOT IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercMissions as mm
            WHERE mm.Completed > 0
        ) AND preACN.MercMissionTitle IS NOT NULL;

    END`
}

const update_mm_procedures = [
  updateMM,
  updateMMRelatedACN
]

module.exports = update_mm_procedures
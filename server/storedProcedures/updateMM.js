const updateMMPart1 = {
  name: 'updateMMPart1',
  query: `CREATE PROCEDURE updateMMPart1()
    BEGIN
  
        DECLARE current_chapter INT;
  
        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;
  
        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableMMPart1;
  
        CREATE temporary TABLE xenoblade2_guide._unavailableMMPart1
        SELECT preMM.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesMMs as preMM
        WHERE (preMM.StoryProgress > current_chapter
            AND preMM.StoryProgress IS NOT NULL)
        OR (preMM.DLCUnlocked > (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preMM.DLCUnlocked IS NOT NULL)
        OR (preMM.MercLevel > (
            SELECT sp.MercLevel
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preMM.MercLevel IS NOT NULL)
        OR (preMM.Nation NOT IN (
            SELECT ma.id
            FROM xenoblade2_guide.majorAreas as ma
            WHERE ma.StoryProgress <= current_chapter
        ) AND preMM.Nation IS NOT NULL)
        OR (preMM.LocationDevLevel > (
            SELECT ma.DevelopmentLevel
            FROM xenoblade2_guide.majorAreas as ma
            WHERE ma.id = preMM.Nation
        ) AND preMM.LocationDevLevel IS NOT NULL)
        OR (preMM.BladeUnlocked IN (
            SELECT blade.id
            FROM xenoblade2_guide.blades as blade
            WHERE blade.Unlocked = 0
        ) AND preMM.BladeUnlocked IS NOT NULL)
        OR (preMM.RequiredBy IN (
            SELECT reqMM.MissionId
            FROM xenoblade2_guide.requirementsMMs as reqMM
            WHERE reqMM.Blade IN (
                SELECT blade.id
                FROM xenoblade2_guide.blades as blade
                WHERE blade.Unlocked = 0
            ) AND reqMM.Blade IS NOT NULL
            ) AND preMM.RequiredBy IN (
                SELECT reqMM.MissionId
                FROM xenoblade2_guide.requirementsMMs as reqMM));
  
        UPDATE xenoblade2_guide.mercMissions
        SET Available = 1
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMMPart1
        )
        OR id NOT IN (
            SELECT preMM.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesMMs as preMM
        );
  
        UPDATE xenoblade2_guide.mercMissions
        SET Available = 0, Completed = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMMPart1
        );

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableMMPart2;
  
        CREATE temporary TABLE xenoblade2_guide._unavailableMMPart2
        SELECT preMM.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesMMs as preMM
        WHERE preMM.MercMissionCompleted IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercMissions as mm
            WHERE mm.Completed = 0
        ) AND preMM.MercMissionCompleted IS NOT NULL;
  
        UPDATE xenoblade2_guide.mercMissions
        SET Available = 0, Completed = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMMPart2
        );
  
      END`
}

const updateMMPart2 = {
  name: 'updateMMPart2',
  query: `CREATE PROCEDURE updateMMPart2()
    BEGIN

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableMMPart3;
    
        CREATE temporary TABLE xenoblade2_guide._unavailableMMPart3
        SELECT preMM.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesMMs as preMM
        WHERE preMM.Quest NOT IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
            AND (quest.Status = preMM.QuestStatus
            OR quest.Status = 'FINISHED')
        ) AND preMM.Quest IS NOT NULL;
    
        UPDATE xenoblade2_guide.mercMissions
        SET Available = 0, Completed = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMMPart3
        );
    
        END`
}

const update_mm_procedures = [
  updateMMPart1,
  updateMMPart2
]

module.exports = update_mm_procedures
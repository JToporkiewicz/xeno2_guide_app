const updateBladePart1 = {
  name: 'updateBladePart1',
  query: `CREATE PROCEDURE updateBladePart1()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableBlade;

        CREATE temporary TABLE xenoblade2_guide._unavailableBlade
        SELECT preBlade.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesBlades as preBlade
        WHERE (preBlade.StoryProgress > current_chapter
            AND preBlade.StoryProgress IS NOT NULL)
        OR (preBlade.NewGamePlus > (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preBlade.NewGamePlus IS NOT NULL)
        OR (preBlade.DLCUnlocked > (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) AND preBlade.DLCUnlocked IS NOT NULL)
        OR (preBlade.Location NOT IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        ) AND preBlade.Location IS NOT NULL)
        OR (preBlade.Monster NOT IN (
            SELECT mon.id
            FROM xenoblade2_guide.monsters as mon
            WHERE mon.Location IN (
                SELECT loc.id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter
            )
        ) AND preBlade.Monster IS NOT NULL);

        UPDATE xenoblade2_guide.blades
        SET Available = 1
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableBlade
        );
        
        UPDATE xenoblade2_guide.blades
        SET Available = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableBlade
        );

    END`
}

const updateBladePart2 = {
  name: 'updateBladePart2',
  query: `CREATE PROCEDURE updateBladePart2()
    BEGIN
        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableBlade;

        CREATE temporary TABLE xenoblade2_guide._unavailableBlade
        SELECT preBlade.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesBlades as preBlade
        WHERE preBlade.SideQuest NOT IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
        ) AND preBlade.SideQuest IS NOT NULL;
          
        UPDATE xenoblade2_guide.blades
        SET Available = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableBlade
        );

    END`
}

const updateBladeLocked = {
  name: 'updateBladeLocked',
  query: `CREATE PROCEDURE updateBladeLocked()
      BEGIN
  
        DECLARE current_chapter INT;
  
        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;
  
        DROP temporary TABLE IF EXISTS xenoblade2_guide._lockedBlade;
  
        CREATE temporary TABLE xenoblade2_guide._lockedBlade
        SELECT preBlade.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesBlades as preBlade
        WHERE ((
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
        ) = 0 AND (
            (
                preBlade.StoryProgress > current_chapter
                AND preBlade.StoryProgress IS NOT NULL
            )
            OR (
                preBlade.Location NOT IN (
                    SELECT loc.id
                    FROM xenoblade2_guide.locations as loc
                    WHERE loc.StoryProgress <= current_chapter
                ) AND preBlade.Location IS NOT NULL
            )
            OR (
                preBlade.NewGamePlus = 1
            )
            OR (
                preBlade.SideQuest NOT IN (
                    SELECT quest.id
                    FROM xenoblade2_guide.quests as quest
                    WHERE quest.Available = 1
                ) AND preBlade.SideQuest IS NOT NULL
            )
        )) OR (
            preBlade.DLCUnlocked > (
                SELECT sp.DLCUnlocked
                FROM xenoblade2_guide.storyProgresses as sp
                WHERE sp.id = 1
            ) AND preBlade.DLCUnlocked IS NOT NULL
        ) OR preBlade.RequiredBy IN (
            SELECT b.id
            FROM xenoblade2_guide.blades as b
            WHERE b.Name IN ('Roc', 'Aegaeon', 'Nia', 'Poppi QT', 'Poppi QTPi')
            AND b.Available = 0);
  
        UPDATE xenoblade2_guide.blades
        SET Available = 0, Unlocked = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._lockedBlade
        );

        UPDATE xenoblade2_guide.blades
        SET Available = 1
        WHERE xenoblade2_guide.blades.Unlocked = 1;
  
        CALL lockBladesACN();
  
    END`
}

const update_blade_procedures = [
  updateBladePart1,
  updateBladePart2,
  updateBladeLocked
]

module.exports = update_blade_procedures
const updateMonster = {
  name: 'updateMonster',
  query: `CREATE PROCEDURE updateMonster()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;
        
        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableMonster;
        DROP temporary TABLE IF EXISTS xenoblade2_guide._unbeatenMonster;

        CREATE temporary TABLE xenoblade2_guide._unavailableMonster
        SELECT id
        FROM xenoblade2_guide.monsters AS monster
        WHERE (monster.DLCRequired IS NOT NULL
            AND (
                SELECT sp.DLCUnlocked
                FROM xenoblade2_guide.storyProgresses as sp
                WHERE sp.id = 1
            ) = 0)
        OR monster.Location IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress > current_chapter
        );

        UPDATE xenoblade2_guide.monsters AS monster
        SET Available = 1
        WHERE monster.id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMonster
        );

        UPDATE xenoblade2_guide.monsters AS monster
        SET monster.Available = 0
        WHERE monster.id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableMonster
        ) AND monster.Beaten = 0;

        CREATE temporary TABLE xenoblade2_guide._unbeatenMonster
        SELECT id
        FROM xenoblade2_guide.monsters AS monster
        WHERE (monster.DLCRequired IS NOT NULL
            AND (
                SELECT sp.DLCUnlocked
                FROM xenoblade2_guide.storyProgresses as sp
                WHERE sp.id = 1
            ) = 0)
        OR (monster.Location IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress > current_chapter
        ) AND (
            SELECT sp.NewGamePlus
			FROM xenoblade2_guide.storyProgresses as sp
			WHERE sp.id = 1
        ) = 0);

        UPDATE xenoblade2_guide.monsters AS monster
        SET monster.Available = 0, monster.Beaten = 0
        WHERE monster.id IN (
            SELECT id
            FROM xenoblade2_guide._unbeatenMonster
        );

    END`
}

const update_monster_procedures = [updateMonster]

module.exports = update_monster_procedures
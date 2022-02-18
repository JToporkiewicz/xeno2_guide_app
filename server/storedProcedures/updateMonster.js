const updateMonster = {
    name: 'updateMonster',
    query: `CREATE PROCEDURE updateMonster()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;
        
        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableMonster;

        CREATE temporary TABLE xenoblade2_guide._availableMonster
        SELECT id
        FROM xenoblade2_guide.monsters AS monster
        WHERE (monster.DLCRequired IS NULL
            OR monster.DLCRequired <= (
                SELECT sp.DLCUnlocked
                FROM xenoblade2_guide.storyProgresses as sp
                WHERE sp.id = 1
            ))
        AND monster.Location IN (
            SELECT id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        );

        UPDATE xenoblade2_guide.monsters AS monster
        SET Available = 1
        WHERE monster.id IN (
            SELECT id
            FROM xenoblade2_guide._availableMonster
        );

        UPDATE xenoblade2_guide.monsters AS monster
        SET monster.Available = 0, monster.Beaten = 0
        WHERE monster.id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableMonster
        );

    END`
}

const updateMonsterRelatedACN = {
    name: 'updateMonsterRelatedACN',
    query: `CREATE PROCEDURE updateMonsterRelatedACN()
    BEGIN
        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 1
        WHERE preACN.MonsterTitle IN (
            SELECT mon.id
            FROM xenoblade2_guide.monsters as mon
            WHERE mon.Beaten > 0
                AND mon.Category = 'Unique'
        ) AND preACN.MonsterTitle IS NOT NULL;

        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 0
        WHERE preACN.MonsterTitle NOT IN (
            SELECT mon.id
            FROM xenoblade2_guide.monsters as mon
            WHERE mon.Beaten > 0
                AND mon.Category = 'Unique'
        ) AND preACN.MonsterTitle IS NOT NULL;

    END`
}

const update_monster_procedures = [
    updateMonster,
    updateMonsterRelatedACN
]

module.exports = update_monster_procedures
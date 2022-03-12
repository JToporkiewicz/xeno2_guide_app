const updateBlade = {
  name: 'updateBlade',
  query: `CREATE PROCEDURE updateBlade()
    BEGIN

        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableBlade;

        CREATE temporary TABLE xenoblade2_guide._availableBlade
        SELECT preBlade.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesblades as preBlade
        WHERE (preBlade.StoryProgress <= current_chapter
            OR preBlade.StoryProgress IS NULL)
        AND (preBlade.NewGamePlus <= (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyprogresses as sp
            WHERE sp.id = 1
        ) OR preBlade.NewGamePlus IS NULL)
        AND (preBlade.DLCUnlocked <= (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyprogresses as sp
            WHERE sp.id = 1
        ) OR preBlade.DLCUnlocked IS NULL)
        AND (preBlade.SideQuest IN (
            SELECT quest.id
            FROM xenoblade2_guide.quests as quest
            WHERE quest.Available = 1
        ) OR preBlade.SideQuest IS NULL)
        AND (preBlade.MercMission IN (
            SELECT mm.id
            FROM xenoblade2_guide.mercmissions as mm
            WHERE mm.Available = 1
        ) OR preBlade.MercMission IS NULL)
        AND (preBlade.Monster IN (
            SELECT mon.id
            FROM xenoblade2_guide.monsters as mon
            WHERE mon.Location IN (
                SELECT loc.id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter
            )
        ) OR preBlade.Monster IS NULL)
        AND (preBlade.Location IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        ) OR preBlade.Location IS NULL);

        
        UPDATE xenoblade2_guide.blades
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableBlade
        )
        OR id NOT IN (
            SELECT preBlade.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesblades as preBlade
        );

        UPDATE xenoblade2_guide.blades
        SET Available = 0, Unlocked = 0
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableBlade
        )
        AND id IN (
            SELECT preBlade.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesblades as preBlade
        );

    END`
}

const update_blade_procedures = [
  updateBlade
]

module.exports = update_blade_procedures
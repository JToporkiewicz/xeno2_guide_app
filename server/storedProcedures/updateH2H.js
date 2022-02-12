const updateH2HFromStoryProgress = {
    name: 'updateH2HFromStoryProgress',
    query: `CREATE PROCEDURE updateH2HFromStoryProgress(
        IN chapter INT,
        IN newGamePlus TINYINT(1),
        IN dlcUnlocked TINYINT(1)
    )
    BEGIN
        UPDATE xenoblade2_guide.heart2hearts
        SET Available = 0, Viewed = 0
        WHERE id IN (
            SELECT RequiredBy
            FROM xenoblade2_guide.prerequisitesh2hs
            WHERE (StoryProgress > chapter OR StoryProgress IS NULL)
            AND (prerequisitesh2hs.NewGamePlus > newGamePlus OR prerequisitesh2hs.NewGamePlus IS NULL)
            AND (prerequisitesh2hs.DLCUnlocked > dlcUnlocked OR prerequisitesh2hs.DLCUnlocked IS NULL)
            AND NOT (StoryProgress IS NULL
                AND prerequisitesh2hs.NewGamePlus IS NULL
                AND prerequisitesh2hs.DLCUnlocked IS NULL)
        );

        CREATE temporary TABLE xenoblade2_guide._availableH2H
        SELECT RequiredBy as id
        FROM xenoblade2_guide.prerequisitesh2hs
        WHERE (StoryProgress <= chapter OR StoryProgress IS NULL)
        AND (prerequisitesh2hs.NewGamePlus <= newGamePlus OR prerequisitesh2hs.NewGamePlus IS NULL)
        AND (prerequisitesh2hs.DLCUnlocked <= dlcUnlocked OR prerequisitesh2hs.DLCUnlocked IS NULL);
    END`}

const updateH2H = {
    name: 'updateH2H',
    query: `CREATE PROCEDURE updateH2H()
    BEGIN
        UPDATE xenoblade2_guide.heart2hearts
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableH2H
        );
    END`
}

const dropAvailableH2HTable = {
    name: 'dropAvailableH2HTable',
    query: `CREATE PROCEDURE dropAvailableH2HTable()
    BEGIN
        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableH2H;
    END`
}

const update_h2h_procedures = [
    updateH2HFromStoryProgress,
    updateH2H,
    dropAvailableH2HTable
]

module.exports = update_h2h_procedures
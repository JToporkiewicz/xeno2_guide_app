const updateH2HPart1 = {
  name: 'updateH2HPart1',
  query: `CREATE PROCEDURE updateH2HPart1()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableH2HPart1;

        CREATE temporary TABLE xenoblade2_guide._unavailableH2HPart1
        SELECT RequiredBy as id
        FROM xenoblade2_guide.prerequisitesH2Hs as preH2H
        WHERE (preH2H.StoryProgress > current_chapter
            AND preH2H.StoryProgress IS NOT NULL)
        OR (preH2H.NewGamePlus > (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
            ) AND preH2H.NewGamePlus IS NOT NULL)
        OR (preH2H.DLCUnlocked > (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
            ) AND preH2H.DLCUnlocked IS NOT NULL)
        OR (preH2H.InnLocation IS NOT NULL
            AND preH2H.InnLocation NOT IN (
                SELECT id
                FROM xenoblade2_guide.majorAreas as ma
                WHERE ma.StoryProgress <= current_chapter
            ))
        OR (preH2H.BladeAffinityChartNode IS NOT NULL
            AND preH2H.BladeAffinityChartNode IN (
                SELECT ACN.id
                FROM xenoblade2_guide.affinityChartNodes as ACN
                WHERE ACN.Unlocked = 0
            ));

        UPDATE xenoblade2_guide.heart2Hearts
        SET Available = 1
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._unavailableH2HPart1
        )
        OR id NOT IN (
            SELECT preH2H.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesH2Hs as preH2H
        );

        UPDATE xenoblade2_guide.heart2Hearts
        SET Available = 0, Viewed = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableH2HPart1
        ) OR (
            Location NOT IN (
                SELECT id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter
            )
        );

    END`
}

const updateH2HPart2 = {
  name: 'updateH2HPart2',
  query: `CREATE PROCEDURE updateH2HPart2()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._unavailableH2HPart2;

        CREATE temporary TABLE xenoblade2_guide._unavailableH2HPart2
        SELECT RequiredBy as id
        FROM xenoblade2_guide.prerequisitesH2Hs as preH2H
        WHERE preH2H.Quest IS NOT NULL
            AND preH2H.Quest NOT IN (
                SELECT quest.id
                FROM xenoblade2_guide.quests as quest
                WHERE quest.Status = 'FINISHED'
            );

        UPDATE xenoblade2_guide.heart2Hearts
        SET Available = 0, Viewed = 0
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._unavailableH2HPart2
        ) OR (
            Location NOT IN (
                SELECT id
                FROM xenoblade2_guide.locations as loc
                WHERE loc.StoryProgress <= current_chapter
            )
        );

    END`
}

const update_h2h_procedures = [
  updateH2HPart1,
  updateH2HPart2
]

module.exports = update_h2h_procedures
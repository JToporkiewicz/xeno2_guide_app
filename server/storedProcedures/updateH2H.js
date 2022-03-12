const updateH2H = {
  name: 'updateH2H',
  query: `CREATE PROCEDURE updateH2H()
    BEGIN
        DECLARE current_chapter INT;

        SELECT sp.Chapter INTO current_chapter
        FROM xenoblade2_guide.storyprogresses as sp
        WHERE sp.id = 1;

        DROP temporary TABLE IF EXISTS xenoblade2_guide._availableH2H;

        CREATE temporary TABLE xenoblade2_guide._availableH2H
        SELECT RequiredBy as id
        FROM xenoblade2_guide.prerequisitesh2hs as preH2H
        WHERE (preH2H.StoryProgress <= current_chapter
            OR preH2H.StoryProgress IS NULL)
        AND (preH2H.NewGamePlus <= (
            SELECT sp.NewGamePlus
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
            ) OR preH2H.NewGamePlus IS NULL)
        AND (preH2H.DLCUnlocked <= (
            SELECT sp.DLCUnlocked
            FROM xenoblade2_guide.storyProgresses as sp
            WHERE sp.id = 1
            ) OR preH2H.DLCUnlocked IS NULL)
        AND (preH2H.InnLocation IS NULL
            OR preH2H.InnLocation IN (
                SELECT id
                FROM xenoblade2_guide.majorAreas as ma
                WHERE ma.StoryProgress <= current_chapter
            ))
        AND (preH2H.BladeAffinityChartNode IS NULL
            OR preH2H.BladeAffinityChartNode IN (
                SELECT ACN.id
                FROM xenoblade2_guide.affinitychartnodes as ACN
                WHERE ACN.Available = 1
            ))
        AND (preH2H.Quest IS NULL
            OR preH2H.Quest IN (
                SELECT quest.id
                FROM xenoblade2_guide.quests as quest
                WHERE quest.Available = 1
            ));

        UPDATE xenoblade2_guide.heart2hearts
        SET Available = 1
        WHERE id IN (
            SELECT id
            FROM xenoblade2_guide._availableH2H
        )
        OR id NOT IN (
            SELECT preH2H.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesh2hs as preH2H
        );

        UPDATE xenoblade2_guide.heart2hearts
        SET Available = 0, Viewed = 0
        WHERE id NOT IN (
            SELECT id
            FROM xenoblade2_guide._availableH2H
        )
        AND id IN (
            SELECT preH2H.RequiredBy as id
            FROM xenoblade2_guide.prerequisitesh2hs as preH2H
        );

    END`
}

const updateH2HRelatedACN = {
  name: 'updateH2HRelatedACN',
  query: `CREATE PROCEDURE updateH2HRelatedACN()
    BEGIN
        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 1
        WHERE preACN.Heart2HeartTitle IN (
            SELECT h2h.id
            FROM xenoblade2_guide.heart2hearts as h2h
            WHERE h2h.Viewed > 0
        ) AND preACN.Heart2HeartTitle IS NOT NULL;

        UPDATE xenoblade2_guide.prerequisitesacns as preACN
        SET preACN.Progress = 0
        WHERE preACN.Heart2HeartTitle NOT IN (
            SELECT h2h.id
            FROM xenoblade2_guide.heart2hearts as h2h
            WHERE h2h.Viewed > 0
        ) AND preACN.Heart2HeartTitle IS NOT NULL;

    END`
}


const update_h2h_procedures = [
  updateH2H,
  updateH2HRelatedACN
]

module.exports = update_h2h_procedures
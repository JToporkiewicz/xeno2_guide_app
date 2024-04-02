const updateChallenge = {
  name: 'updateChallenge',
  query: `CREATE PROCEDURE updateChallenge()
    BEGIN
      DECLARE current_chapter INT;

      SELECT sp.Chapter INTO current_chapter
      FROM xenoblade2_guide.storyProgresses as sp
      WHERE sp.id = 1;

      DROP temporary TABLE IF EXISTS xenoblade2_guide._partAvailableChallenges;
      DROP temporary TABLE IF EXISTS xenoblade2_guide._availableChallenges;

      CREATE temporary TABLE xenoblade2_guide._partAvailableChallenges
      SELECT preChall.RequiredBy as id
      FROM xenoblade2_guide.prerequisitesChallenges as preChall
      WHERE (preChall.Challenge <= current_chapter
        OR preChall.Challenge IS NULL)
      AND (preChall.NewGamePlus <= (
        SELECT sp.NewGamePlus
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1
      ) OR preChall.NewGamePlus IS NULL)
      AND (preChall.UniqueMonster IN (
        SELECT mon.id
        FROM xenoblade2_guide.monsters as mon
        WHERE mon.Location IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        )
      ) OR preChall.UniqueMonster IS NULL)
      AND preChall.Challenge IS NULL;

      CREATE temporary TABLE xenoblade2_guide._availableChallenges
      SELECT preChall.RequiredBy as id
      FROM xenoblade2_guide.prerequisitesChallenges as preChall
      WHERE preChall.Challenge IN (
        SELECT chall.id
        FROM xenoblade2_guide.challengeBattles as chall
        WHERE chall.Beaten
      )
      UNION ALL
        SELECT part.id
        FROM xenoblade2_guide._partAvailableChallenges AS part;

      UPDATE xenoblade2_guide.challengeBattles
      SET Beaten = 0
      WHERE id NOT IN (
        SELECT id
        FROM xenoblade2_guide._availableChallenges
      )
      AND id IN (
        SELECT preChall.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesChallenges as preChall
      );
  END`
}

const update_challenge_procedures = [updateChallenge];

module.exports = update_challenge_procedures
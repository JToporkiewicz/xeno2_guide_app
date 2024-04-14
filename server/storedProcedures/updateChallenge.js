const updateChallenge = {
  name: 'updateChallenge',
  query: `CREATE PROCEDURE updateChallenge()
    BEGIN
      DECLARE current_chapter INT;

      SELECT sp.Chapter INTO current_chapter
      FROM xenoblade2_guide.storyProgresses as sp
      WHERE sp.id = 1;

      DROP temporary TABLE IF EXISTS xenoblade2_guide._unvailableChallengesPart1;

      CREATE temporary TABLE xenoblade2_guide._unvailableChallengesPart1
      SELECT preChall.RequiredBy as id
      FROM xenoblade2_guide.prerequisitesChallenges as preChall
      WHERE (preChall.Chapter > current_chapter
        AND preChall.Chapter IS NOT NULL)
      OR (preChall.NewGamePlus > (
        SELECT sp.NewGamePlus
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1
      ) AND preChall.NewGamePlus IS NOT NULL)
      OR (preChall.UniqueMonster NOT IN (
        SELECT mon.id
        FROM xenoblade2_guide.monsters as mon
        WHERE mon.Location IN (
            SELECT loc.id
            FROM xenoblade2_guide.locations as loc
            WHERE loc.StoryProgress <= current_chapter
        )
      ) AND preChall.UniqueMonster IS NOT NULL);

      UPDATE xenoblade2_guide.challengeBattles
      SET Available = 1
      WHERE id NOT IN (
        SELECT id
        FROM xenoblade2_guide._unvailableChallengesPart1
      )
      OR id NOT IN (
        SELECT preChall.RequiredBy as id
        FROM xenoblade2_guide.prerequisitesChallenges as preChall
      );

      UPDATE xenoblade2_guide.challengeBattles
      SET Available = 0
      WHERE id IN (
        SELECT id
        FROM xenoblade2_guide._unvailableChallengesPart1
      );

      DROP temporary TABLE IF EXISTS xenoblade2_guide._unvailableChallengesPart2;

      CREATE temporary TABLE xenoblade2_guide._unvailableChallengesPart2
      SELECT preChall.RequiredBy as id
      FROM xenoblade2_guide.prerequisitesChallenges as preChall
      WHERE preChall.Challenge IN (
        SELECT chall.id
        FROM xenoblade2_guide.challengeBattles as chall
        WHERE chall.Beaten = 0
      );

      UPDATE xenoblade2_guide.challengeBattles
      SET Available = 0, Beaten = 0
      WHERE id IN (
        SELECT id
        FROM xenoblade2_guide._unvailableChallengesPart2
      );

      UPDATE xenoblade2_guide.challengeBattles
      SET Beaten = 0
      WHERE id IN (
        SELECT id
        FROM xenoblade2_guide._unvailableChallengesPart1
      ) AND 0 = (
        SELECT sp.NewGamePlus
        FROM xenoblade2_guide.storyProgresses as sp
        WHERE sp.id = 1
      );

  END`
}

const update_challenge_procedures = [updateChallenge];

module.exports = update_challenge_procedures
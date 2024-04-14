const updateAll = {
  name: 'updateAll',
  query: `CREATE PROCEDURE updateAll()
    BEGIN
      CALL updateMonster ();
      CALL updateBladePart1 ();
      CALL updateMMPart1 ();
      CALL updateACNPart1 ();
      CALL updateH2HPart1 ();
      CALL updateQuest ();
      CALL updateMMPart2 ();
      CALL updateH2HPart2 ();
      CALL updateBladePart2 ();
      CALL updateBladeLocked ();
      CALL updateACNPart2 ();
      CALL updateChallenge ();
    END`
}

const update_all_procedures = [updateAll]

module.exports = update_all_procedures
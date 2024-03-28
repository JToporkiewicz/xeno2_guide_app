const updateFieldSkill = {
  name: 'updateFieldSkill',
  query: `CREATE PROCEDURE updateFieldSkill(
        IN skillId INT
    )
    BEGIN

        DECLARE skillName TEXT;
        DECLARE skillLevelTotal INT;

        SELECT acn.Name INTO skillName
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.id = skillId;

        SELECT COALESCE(COUNT(*), 0) INTO skillLevelTotal
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.Name = skillName
        AND acn.Unlocked = 1;

        UPDATE xenoblade2_guide.fieldSkills as fs
        SET fs.TotalLevel = skillLevelTotal
        WHERE fs.Name = skillName;

    END`
}

const updateFieldSkillCommon = {
  name: 'updateFieldSkillCommon',
  query: `CREATE PROCEDURE updateFieldSkillCommon(
        IN skillId INT
    )
    BEGIN
    
        DECLARE skillName TEXT;
        DECLARE skillLevel3Count INT;
        DECLARE skillLevel2Count INT;
        DECLARE skillLevel1Count INT;
        DECLARE skillLevelTotal INT;

        SELECT fs.Name INTO skillName
        FROM xenoblade2_guide.fieldSkills as fs
        WHERE fs.id = skillId;

        SELECT COALESCE(COUNT(*), 0) INTO skillLevel3Count
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.Name = skillName
        AND acn.SkillLevel = 3
        AND acn.Unlocked = 1;

        SELECT COALESCE(COUNT(*), 0) INTO skillLevel2Count
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.Name = skillName
        AND acn.SkillLevel = 2
        AND acn.Unlocked = 1;

        SELECT COALESCE(COUNT(*), 0) INTO skillLevel1Count
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.Name = skillName
        AND acn.SkillLevel = 1
        AND acn.Unlocked = 1;

        SET skillLevelTotal = (
            skillLevel3Count * 3
            + (skillLevel2Count - skillLevel3Count) * 2
            + (skillLevel1Count
                - (skillLevel2Count - skillLevel3Count)
                - skillLevel3Count)
        ) + (
            SELECT fs.CommonBladeContribution
            FROM xenoblade2_guide.fieldSkills as fs
            WHERE fs.Name = skillName);

        UPDATE xenoblade2_guide.fieldSkills as fs
        SET fs.TotalLevel = skillLevelTotal
        WHERE fs.Name = skillName;

    END`
}

const updateAllFieldSkills = {
  name: 'updateAllFieldSkills',
  query: `CREATE PROCEDURE updateAllFieldSkills()
    BEGIN
    
        CALL updateFieldSkillCommon(1);
        CALL updateFieldSkillCommon(2);
        CALL updateFieldSkillCommon(3);
        CALL updateFieldSkillCommon(4);
        CALL updateFieldSkillCommon(5);
        CALL updateFieldSkillCommon(6);
        CALL updateFieldSkillCommon(7);
        CALL updateFieldSkillCommon(8);
        CALL updateFieldSkillCommon(9);
        CALL updateFieldSkillCommon(10);
        CALL updateFieldSkillCommon(11);
        CALL updateFieldSkillCommon(12);
        CALL updateFieldSkillCommon(13);
        CALL updateFieldSkillCommon(14);
        CALL updateFieldSkillCommon(15);
        CALL updateFieldSkillCommon(16);
        CALL updateFieldSkillCommon(17);
        CALL updateFieldSkillCommon(18);
        CALL updateFieldSkillCommon(19);
        CALL updateFieldSkillCommon(20);
        CALL updateFieldSkillCommon(21);
        CALL updateFieldSkillCommon(22);
        CALL updateFieldSkillCommon(23);
        CALL updateFieldSkillCommon(24);
        CALL updateFieldSkillCommon(25);
        CALL updateFieldSkillCommon(26);
        CALL updateFieldSkillCommon(27);
        CALL updateFieldSkillCommon(28);
        CALL updateFieldSkillCommon(29);
        CALL updateFieldSkillCommon(30);
        CALL updateFieldSkillCommon(31);
        CALL updateFieldSkillCommon(32);
        CALL updateFieldSkillCommon(33);
        CALL updateFieldSkillCommon(34);
        CALL updateFieldSkillCommon(35);
        CALL updateFieldSkillCommon(36);
        CALL updateFieldSkillCommon(37);
        CALL updateFieldSkillCommon(38);
        CALL updateFieldSkillCommon(39);
        CALL updateFieldSkillCommon(40);
        CALL updateFieldSkillCommon(41);
        CALL updateFieldSkillCommon(42);
        CALL updateFieldSkillCommon(43);
        CALL updateFieldSkillCommon(44);
        CALL updateFieldSkillCommon(45);
        CALL updateFieldSkillCommon(46);
        CALL updateFieldSkillCommon(47);
        CALL updateFieldSkillCommon(48);
        CALL updateFieldSkillCommon(49);
        CALL updateFieldSkillCommon(50);
        CALL updateFieldSkillCommon(51);
        CALL updateFieldSkillCommon(52);
        CALL updateFieldSkillCommon(53);
        CALL updateFieldSkillCommon(54);
        CALL updateFieldSkillCommon(55);
        CALL updateFieldSkillCommon(56);

    END`
}
  
const update_field_skill_procedures = [
  updateFieldSkill,
  updateFieldSkillCommon,
  updateAllFieldSkills
]

module.exports = update_field_skill_procedures
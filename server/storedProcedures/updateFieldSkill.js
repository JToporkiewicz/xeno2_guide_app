const updateFieldSkill = {
  name: 'updateFieldSkill',
  query: `CREATE PROCEDURE updateFieldSkill(
        IN skillId INT
    )
    BEGIN

        DECLARE skillName TEXT;
        DECLARE skillLevel3Count INT;
        DECLARE skillLevel2Count INT;
        DECLARE skillLevel1Count INT;
        DECLARE skillLevelTotal INT;

        SELECT acn.Name INTO skillName
        FROM xenoblade2_guide.affinityChartNodes as acn
        WHERE acn.id = skillId;

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

const update_field_skill_procedures = [
  updateFieldSkill,
  updateFieldSkillCommon
]

module.exports = update_field_skill_procedures
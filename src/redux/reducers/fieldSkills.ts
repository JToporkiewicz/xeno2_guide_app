import createReducer from 'redux-action-reducer';
import { IFieldSkills } from '../../interfaces';
import { FieldSkillsActions } from '../actions/fieldSkills';
import { IUpdateFieldSkillLevel } from '../interfaces/fieldSkills';

export const fieldSkillsReducer = createReducer<IFieldSkills[]>(
  [FieldSkillsActions.SetFieldSkills,
    (_:IFieldSkills[], fieldSkills:IFieldSkills[]) => fieldSkills],
  [FieldSkillsActions.UpdateFieldSkillLevelUnlocked,
    (state:IFieldSkills[], newFieldSkill:IUpdateFieldSkillLevel) => {
      const oldSkill = state.find((skill) => skill.id === newFieldSkill.id);
      if (!oldSkill) {
        return state;
      }

      return state.filter((skill) => skill.id !== newFieldSkill.id)
        .concat({
          ...oldSkill,
          CommonBladeContribution: newFieldSkill.CommonBladeContribution,
          TotalLevel: oldSkill.TotalLevel +
            (newFieldSkill.CommonBladeContribution - oldSkill.CommonBladeContribution)
        }).sort((skillA, skillB) =>
          skillA.id < skillB.id ? -1 : 1
        )
    }]
)([]);

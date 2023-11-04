import createReducer from 'redux-action-reducer';
import { IFieldSkills } from 'interfaces';
import { FieldSkillsActions } from '../actions/fieldSkills';
import { IUpdateFieldSkillLevel } from '../interfaces/fieldSkills';
import { IBladeState } from 'reduxState/interfaces/reduxState';
import { BladeActions } from 'reduxState/actions/blades';

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
    }],
  [BladeActions.UpdateBladeUnlocked, (fieldSkills:IFieldSkills[], bladeState: IBladeState) => {
    const nodes = bladeState.affinityChart.map((ac) => ac.branchName)
    const fieldSkillsUpdate = fieldSkills.filter((f) => nodes.includes(f.Name))
    
    return fieldSkills.filter((f) => !nodes.includes(f.Name))
      .concat(fieldSkillsUpdate.map((fs) => {
        if (bladeState.unlocked) {
          return {
            ...fs,
            TotalLevel: fs.TotalLevel + 1
          }
        } else {
          const branch = bladeState.affinityChart.find((n) => n.branchName === fs.Name)
          if (branch) {
            const nodeTotal = branch.nodes.filter((n) => n.unlocked)
              .sort((skillA, skillB) => skillA.nodeId < skillB.nodeId ? -1 : 1)
            return {
              ...fs,
              TotalLevel: fs.TotalLevel - (nodeTotal[nodeTotal.length - 1]?.skillLevel || 0)
            }
          }
          return fs
        }
      })).sort((skillA, skillB) =>
        skillA.id < skillB.id ? -1 : 1
      )
  }]
)([]);

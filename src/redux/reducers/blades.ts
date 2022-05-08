import createReducer from 'redux-action-reducer';
import { IBlade } from '../../interfaces';
import { BladeActions } from '../actions/blades';
import { IAffinityChartBranchState, IBladeState, IUpdateShow } from '../interfaces/reduxState';

export const bladesReducer = createReducer<IBladeState[]>(
  [BladeActions.SetBlade, (bladeState:IBladeState[], blades:IBlade[]) => {
    const newBladeIds = blades.map((driver:IBlade) => driver.id)
    return bladeState.filter((old) => !newBladeIds.includes(old.id))
      .concat(blades.map((blade) => ({
        id: blade.id,
        name: blade.Name,
        gender: blade.Gender,
        type: blade.Type,
        weapon: blade.Weapon,
        element: blade.Element,
        role: blade.Role,
        auxCoreCount: blade.AuxCoreCount,
        source: blade.Source,
        heart2heartId: blade.Heart2Heart,
        bladeQuestId: blade.BladeQuest,
        affinityChart: {
          id: blade.AffinityChart,
          branches: [] as IAffinityChartBranchState[]
        },
        favItem1: blade.FavItem1,
        favItem2: blade.FavItem2,
        favItemType1: blade.FavItemType1,
        favItemType2: blade.FavItemType2,
        unlocked: blade.Unlocked,
        available: blade.Available,
        show: false
      }))).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }],
  [BladeActions.UpdateShowBlade, (bladeState:IBladeState[], updateShow: IUpdateShow) => {
    const oldBlade = bladeState.find((blade) => blade.id === updateShow.id);
    if (!oldBlade) {
      return bladeState;
    }

    return bladeState.filter((blade) => blade.id !== updateShow.id)
      .concat([{
        ...oldBlade,
        show: updateShow.show
      }]).sort((bladeA, bladeB) =>
        bladeA.id < bladeB.id ? -1 : 1
      )
  }]
)([]);

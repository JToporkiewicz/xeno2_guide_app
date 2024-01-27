import { IQuest } from 'interfaces';
import { IBladeAvailability } from 'reduxState/interfaces/availabilityState';

export const bladeFilter = (blades: IBladeAvailability[], quests: IQuest[]):IBladeAvailability[] =>
  blades.filter((b) => !b.name.includes('Dagas') || 
  quests.find((q) => q.id === 101)?.Status === 'FINISHED' && b.id !== 19
  || quests.find((q) => q.id === 101)?.Status !== 'FINISHED' && b.id !== 53)
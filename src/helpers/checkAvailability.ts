import {
  IFieldSkills,
  IFieldSkillsTotal,
  IHeart2Heart,
  IMercMission,
  IMonster,
  IQuest,
  IStoryProgress
} from 'interfaces';
import { IRequirement, RequirementArea } from 'interfaces/common';
import {
  IAffinityChartBranchAvailability,
  IAffinityChartNodeAvailability,
  IBladeAvailability,
  IHeart2HeartAvailability,
  IMercMissionAvailability,
  IMonsterAvailability,
  IQuestAvailability,
  IRequirementAvailability
} from 'reduxState/interfaces/availabilityState';
import {
  IAffinityChartBranchState,
  IAffinityChartNodeState,
  IBladeState,
  IMajorLocations
} from 'reduxState/interfaces/reduxState';
  
const checkStoryProgressAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  storyProgress: IStoryProgress
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea['Story Progress']:
      return {
        ...pre,
        available: true,
        completed: pre.requirementCount ? pre.requirementCount <= storyProgress.Chapter : false,
        progress: storyProgress.Chapter
      }
    case RequirementArea['New Game Plus']:
      return {
        ...pre,
        available: true,
        completed: storyProgress.NewGamePlus || !pre.requirement
      }
    case RequirementArea['DLC Unlocked']:
      return {
        ...pre,
        available: true,
        completed: storyProgress.DLCUnlocked || !pre.requirement
      }
    case RequirementArea['Merc Level']:
      return {
        ...pre,
        available: storyProgress.Chapter >= 4,
        completed: pre.requirementCount ?
          storyProgress.MercLevel >= pre.requirementCount
          : false,
        progress: storyProgress.MercLevel
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkLocationProgressAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  storyProgress: IStoryProgress,
  locations: IMajorLocations[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea['Nation Dev Level']:
      const area = locations.find((loc) => loc.id === pre.reqId)
      return {
        ...pre,
        available: area ? area.StoryProgress <= storyProgress.Chapter : false,
        completed: area && pre.requirementCount ?
          area.DevelopmentLevel >= pre.requirementCount : false,
        progress: area ? area.DevelopmentLevel : 0
      }
    case RequirementArea.Location:
      const location = locations
        .find((ma) => ma.InnerMajorAreas
          .find((inner) => inner.Locations
            .find((l) => l.id === pre.reqId)))?.InnerMajorAreas
        .find((inner) => inner.Locations
          .find((l) => l.id === pre.reqId))?.Locations.find((l) => l.id === pre.reqId)
      return {
        ...pre,
        available: location ? location.StoryProgress <= storyProgress.Chapter : false,
        completed: location ? location.StoryProgress <= storyProgress.Chapter : false
      }
    default:
      if (pre.reqId && pre.requirement.includes('->')) {
        const location = locations
          .find((ma) => ma.InnerMajorAreas
            .find((inner) => inner.Locations
              .find((l) => l.id === pre.reqId)))?.InnerMajorAreas
          .find((inner) => inner.Locations
            .find((l) => l.id === pre.reqId))?.Locations.find((l) => l.id === pre.reqId)
        return {
          ...pre,
          available: location ? location.StoryProgress <= storyProgress.Chapter : false,
          completed: location ? location.StoryProgress <= storyProgress.Chapter : false
        }
      } else {
        const preOther = pre as IRequirementAvailability
        return {
          ...preOther,
          available: preOther.available || false
        }
      }
    }
  })
  
const checkQuestProgressAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  sideQuests: IQuest[] | IQuestAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.SideQuest:
    case RequirementArea.Quest:
      const sideQuest = sideQuests.find((q) => q.id === pre.reqId) as IQuestAvailability
      return {
        ...pre,
        available: sideQuest?.Available || false,
        completed: sideQuest?.Status === 'FINISHED' || false
      }
    case RequirementArea.StartSideQuest:
      const startQuest = sideQuests.find((q) => q.id === pre.reqId) as IQuestAvailability
      return {
        ...pre,
        available: startQuest?.Available || false,
        completed: startQuest?.Status !== 'NOT STARTED' || false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkBladeProgressAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  blades: IBladeState[] | IBladeAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.Blade:
      const blade = blades.find((b) => b.id === pre.reqId) as IBladeAvailability
      return {
        ...pre,
        available: blade?.available || false,
        completed: blade?.unlocked || false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkFieldSkillAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  fieldSkills: IFieldSkillsTotal[],
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea['Field Skills']:
      const skill = fieldSkills.find((skill) => skill.id === pre.reqId)
      return {
        ...pre,
        available: true,
        completed: skill ? skill.TotalLevel >= (pre.requirementCount || 0) : false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkACNProgressAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  blades: IBladeState[] | IBladeAvailability[],
  affinityChart?: IAffinityChartBranchState[] | IAffinityChartBranchAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea['Affinity Chart Node']:
      let node;
      let blade;
      if (affinityChart) {
        blade = blades.find((b) => b.affinityChart
          .find((branch) => branch.branchName === pre.requirement
              && branch.nodes.find((n) => n.nodeId === pre.reqId)))
        node = affinityChart
          .find((acb) => acb.branchName === pre.requirement)?.nodes
          .find((acn) => acn.nodeId === pre.reqId) as IAffinityChartNodeAvailability
      } else {
        const nodeDetails = pre.requirement.split(': ')[1].split(' Level ');
  
        blade = blades.find((b) => b.id === pre.reqId);
        node = blade?.affinityChart
          .find((acb) => acb.branchName === nodeDetails[0])?.nodes
          .find((acn) => acn.skillLevel === Number(nodeDetails[1])
          ) as IAffinityChartNodeAvailability
      }
      return {
        ...pre,
        available: blade?.unlocked && (node?.available || node?.unlocked || false) || false,
        completed: blade?.unlocked && (node?.unlocked || false) || false
      }
    case RequirementArea['Use a move']:
      const moveBlade = blades.find((b) => b.affinityChart
        .find((branch) => branch.branchName === pre.requirement
          && branch.nodes.find((n) => n.nodeId === pre.reqId)))
      const moveNode = moveBlade?.affinityChart.find((branch) =>
        branch.nodes.find((node) => node.nodeId === pre.reqId))?.nodes
        .find((node) => node.nodeId === pre.reqId) as IAffinityChartNodeAvailability
      return {
        ...pre,
        available: moveBlade?.unlocked
          && (moveNode?.available || moveNode?.unlocked || false)
          || false,
        completed: moveBlade?.unlocked
          && (moveNode?.unlocked || false)
          && pre.progress === pre.requirementCount || false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkH2HAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  heart2Hearts: IHeart2HeartAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.Heart2Heart:
      const h2h = heart2Hearts.find((h) => h.id === pre.reqId)
      return {
        ...pre,
        available: h2h?.Available || false,
        completed: h2h?.Viewed || false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkMMAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  mercMissions: IMercMissionAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.MercMission:
      const mercMission = mercMissions.find((mm) => mm.id === pre.reqId)
      return {
        ...pre,
        available: mercMission?.Available || false,
        completed: mercMission?.Completed || false
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkMonAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[],
  monsters: IMonsterAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.Monster:
      const mon = monsters.find((m) => m.id === pre.reqId)
      return {
        ...pre,
        available: mon?.Available || false
      }
    case RequirementArea['Monster Type']:
      const monType = monsters.find((m) =>
        m.Type === pre.requirement.split(': ')[1] && m.Available)
      return {
        ...pre,
        available: monType !== undefined
      }
    default:
      const preOther = pre as IRequirementAvailability
      return {
        ...preOther,
        available: preOther.available || false
      }  
    }
  })
  
const checkOtherAchieved = (
  preReqs: IRequirement[] | IRequirementAvailability[]
): IRequirementAvailability[] =>
  preReqs.map((pre) => {
    switch (pre.area) {
    case RequirementArea.Blade:
    case RequirementArea['Affinity Chart Node']:
    case RequirementArea['Use a move']:
    case RequirementArea['Field Skills']:
    case RequirementArea['Story Progress']:
    case RequirementArea['New Game Plus']:
    case RequirementArea['DLC Unlocked']:
    case RequirementArea.Heart2Heart:
    case RequirementArea.Quest:
    case RequirementArea.SideQuest:
    case RequirementArea.StartSideQuest:
    case RequirementArea.MercMission:
    case RequirementArea.Monster:
    case RequirementArea['Monster Type']:
    case RequirementArea.Location:
    case RequirementArea['Nation Dev Level']:
    case RequirementArea['Merc Level']:
      const preAvailability = pre as IRequirementAvailability
      return {
        ...preAvailability,
        available: preAvailability?.available || false
      }
    default:
      const otherAvailability = pre as IRequirementAvailability
      return {
        ...otherAvailability,
        completed: otherAvailability?.completed || undefined,
        available: otherAvailability?.available
            || otherAvailability?.reqId === undefined
            || otherAvailability?.reqId === null
      }
    }
  })
  
const checkReqAchieved = (
  reqs: IRequirement[] | IRequirementAvailability[],
  blades: IBladeAvailability[]
): IRequirementAvailability[] =>
  reqs.map((r) => {
    switch (r.area) {
    case RequirementArea.Blade:
      const blade = blades.find((b) => b.id === r.reqId) as IBladeAvailability
      return {
        ...r,
        available: blade?.available || false,
        completed: blade?.unlocked || false
      }
    default:
      const preOther = r as IRequirementAvailability
      return {
        ...preOther,
        available: true
      }  
    }
  })
  
const totalFieldSkill = (
  fieldSkills: IFieldSkills[],
  blades: IBladeState[] | IBladeAvailability[]
): IFieldSkillsTotal[] => {
  let rareBladeSkills = {} as {[key:string]: number}
  
  blades.forEach((b) => {
    b.affinityChart.forEach((branch) => {
      const fieldSkill = fieldSkills.find((f) => f.Name === branch.branchName)
      if (fieldSkill === undefined) {
        return;
      } else {
        const unlockedNodes = branch.nodes.filter((n) => n.unlocked)
          .sort((skillA, skillB) => Number(skillA.nodeId) < Number(skillB.nodeId) ? -1 : 1)
        const currentTotal = rareBladeSkills[branch.branchName]
        rareBladeSkills[branch.branchName] = fieldSkill.CommonBladeContribution
            + (currentTotal || 0)
            + (unlockedNodes.length > 0 ? unlockedNodes[unlockedNodes.length - 1].skillLevel : 0)
      }
    })
  })
  
  return fieldSkills.map((f) => ({
    ...f,
    TotalLevel: rareBladeSkills[f.Name] || f.CommonBladeContribution
  }))
}
  
export const checkMonsterAvailability = (
  monLocation: number,
  locations: IMajorLocations[],
  storyProgress: IStoryProgress
): boolean =>
  (locations
    .find((ma) => ma.InnerMajorAreas
      .find((inner) => inner.Locations
        .find((l) => l.id === monLocation)))?.InnerMajorAreas
    .find((inner) => inner.Locations
      .find((l) => l.id === monLocation))?.Locations
    .find((l) => l.id === monLocation)?.StoryProgress || 10) <= storyProgress.Chapter || false
  
export const checkAllAvailability = (
  storyProgress: IStoryProgress,
  locations: IMajorLocations[],
  monsters: IMonster[],
  blades: IBladeState[],
  fieldSkills: IFieldSkills[],
  heart2Hearts: IHeart2Heart[],
  sideQuests: IQuest[],
  mercMissions: IMercMission[]
): {
    monsters: IMonsterAvailability[],
    blades: IBladeAvailability[],
    heart2Hearts: IHeart2HeartAvailability[],
    sideQuests: IQuestAvailability[],
    mercMissions: IMercMissionAvailability[],
    fieldSkills: IFieldSkillsTotal[]
  } => {
  const monAvailability = monsters.map((mon) => ({
    ...mon,
    Available: checkMonsterAvailability(mon.LocationId, locations, storyProgress)
  }))
  
  // blade check - part 1
  let bladeAvailable = blades.map((b) => {
    if (b.prerequisites === undefined || b.prerequisites.length === 0) {
      return {
        ...b,
        prerequisites: undefined,
        available: true
      }
    }
    const locPres = checkLocationProgressAchieved(b.prerequisites, storyProgress, locations);
    const storyPres = checkStoryProgressAchieved(locPres, storyProgress);
    const monPres = checkMonAchieved(storyPres, monAvailability);
    const otherPres = checkOtherAchieved(monPres);
  
    return {
      ...b,
      prerequisites: otherPres,
      available: otherPres.find((p) => p.completed === false) === undefined
    }
  }) as IBladeAvailability[]
  
  //merc mission check - part 1
  let mercMissionAvailable = mercMissions.map((mm): IMercMissionAvailability => {
    const mmReqs = checkReqAchieved(mm.Requirements, bladeAvailable);
    if (mm.Prerequisites === undefined || mm.Prerequisites.length === 0) {
      return {
        ...mm,
        Requirements: mmReqs,
        Prerequisites: undefined,
        Available: true
      }
    }
    const locPres = checkLocationProgressAchieved(mm.Prerequisites, storyProgress, locations);
    const storyPres = checkStoryProgressAchieved(locPres, storyProgress);
    const bladePres = checkBladeProgressAchieved(storyPres, bladeAvailable);
    const otherPres = checkOtherAchieved(bladePres)
  
    return {
      ...mm,
      Requirements: mmReqs,
      Prerequisites: otherPres,
      Available: otherPres.find((p) => p.completed === false) === undefined
    }
  })
    
  mercMissionAvailable = mercMissionAvailable.map((mm) => {
    if (mm.Prerequisites === undefined || mm.Prerequisites.length === 0) {
      return mm
    }
  
    const mmPres = checkMMAchieved(mm.Prerequisites, mercMissionAvailable)
  
    return {
      ...mm,
      Prerequisites: mmPres,
      Available: mmPres.find((p) => p.completed === false) === undefined
    }
  })
  
  // acn check - part 1
  bladeAvailable = bladeAvailable.map((b) => {
    const chartAvailable = b.affinityChart.map((branch: IAffinityChartBranchState) => ({
      ...branch,
      nodes: branch.nodes.map((node: IAffinityChartNodeState): IAffinityChartNodeAvailability => {
        if (node.preReqs === undefined || node.preReqs.length === 0) {
          return {
            ...node,
            preReqs: undefined,
            available: true
          }
        }
  
        const locPres = checkLocationProgressAchieved(node.preReqs, storyProgress, locations);
        const storyPres = checkStoryProgressAchieved(locPres, storyProgress);
        const monPres = checkMonAchieved(storyPres, monAvailability);
        const mmPres = checkMMAchieved(monPres, mercMissionAvailable);
        const otherPres = checkOtherAchieved(mmPres);
  
        return {
          ...node,
          preReqs: otherPres,
          available: otherPres.find((p) => p.available === false) === undefined
        }
      })
    }))
  
    return {
      ...b,
      affinityChart: chartAvailable.map((branch) => ({
        ...branch,
        nodes: branch.nodes.map((node: IAffinityChartNodeAvailability) => {
          if (node.preReqs === undefined || node.preReqs.length === 0) {
            return node
          }
          const acnPres = checkACNProgressAchieved(node.preReqs, bladeAvailable, chartAvailable);
    
          return {
            ...node,
            preReqs: acnPres,
            available: acnPres.find((p) => p.available === false) === undefined
          }
        })
      }))
    }
  })
  
  // field skills total
  const fieldSkillTotal = totalFieldSkill(fieldSkills, bladeAvailable);
  
  // h2h check - part 1
  let heart2HeartAvailable = heart2Hearts.map((h2h): IHeart2HeartAvailability => {
    if (h2h.PreReqs === undefined || h2h.PreReqs.length === 0) {
      return {
        ...h2h,
        PreReqs: undefined,
        Available: true
      }
    }
  
    const locPres = checkLocationProgressAchieved(h2h.PreReqs, storyProgress, locations);
    const storyPres = checkStoryProgressAchieved(locPres, storyProgress);
    const bladePres = checkBladeProgressAchieved(storyPres, bladeAvailable);
    const acnPres = checkACNProgressAchieved(bladePres, bladeAvailable);
    const fieldPres = checkFieldSkillAchieved(acnPres, fieldSkillTotal);
    const otherPres = checkOtherAchieved(fieldPres);
  
    return {
      ...h2h,
      PreReqs: otherPres,
      Available: otherPres.find((p) => p.completed === false) === undefined
    }
  })
  
  // sidequest check
  let questAvailable = sideQuests.map((q): IQuestAvailability => {
    if (q.PreReqs === undefined || q.PreReqs.length === 0) {
      return {
        ...q,
        PreReqs: undefined,
        Available: true
      }
    }
  
    const locPres = checkLocationProgressAchieved(q.PreReqs, storyProgress, locations);
    const storyPres = checkStoryProgressAchieved(locPres, storyProgress);
    const mmPres = checkMMAchieved(storyPres, mercMissionAvailable);
    const h2hPres = checkH2HAchieved(mmPres, heart2HeartAvailable);
    const bladePres = checkBladeProgressAchieved(h2hPres, bladeAvailable);
    const acnPres = checkACNProgressAchieved(bladePres, bladeAvailable);
    const otherPres = checkOtherAchieved(acnPres);
  
    return {
      ...q,
      PreReqs: otherPres,
      Available: otherPres.find((p) => p.completed === false) === undefined
    }
  })
  
  questAvailable = questAvailable.map((q) => {
    if (q.PreReqs === undefined || q.PreReqs.length === 0) {
      return q
    }
  
    const questPres = checkQuestProgressAchieved(q.PreReqs, questAvailable);
  
    return {
      ...q,
      PreReqs: questPres,
      Available: questPres.find((p: IRequirementAvailability) =>
        p.completed === false) === undefined
    }
  })
  
  // remaining checks
  bladeAvailable = bladeAvailable.map((b) => {
    if (b.prerequisites === undefined || b.prerequisites.length === 0) {
      return {
        ...b,
        affinityChart: b.affinityChart.map((branch) => ({
          ...branch,
          nodes: branch.nodes.map((node) => {
            if (node.preReqs === undefined || node.preReqs.length === 0) {
              return node
            }
  
            const questPres = checkQuestProgressAchieved(node.preReqs, questAvailable);
            const h2hPres = checkH2HAchieved(questPres, heart2HeartAvailable);
  
            return {
              ...node,
              preReqs: h2hPres,
              available: h2hPres.find((p) => p.available === false) === undefined
            }
          })
        }))
      }
    }
  
    const bladeQuestPres = checkQuestProgressAchieved(b.prerequisites, questAvailable);
  
    return {
      ...b,
      affinityChart: b.affinityChart.map((branch) => ({
        ...branch,
        nodes: branch.nodes.map((node) => {
          if (node.preReqs === undefined || node.preReqs.length === 0) {
            return node
          }

          const questPres = checkQuestProgressAchieved(node.preReqs, questAvailable);
          const h2hPres = checkH2HAchieved(questPres, heart2HeartAvailable);

          return {
            ...node,
            preReqs: h2hPres,
            available: h2hPres.find((p) => p.available === false) === undefined
          }
        })
      })),
      prerequisites: bladeQuestPres,
      available: bladeQuestPres.find((p) => p.completed === false) === undefined
    }
  })
  
  heart2HeartAvailable = heart2HeartAvailable.map((h2h) => {
    if (h2h.PreReqs === undefined || h2h.PreReqs.length === 0) {
      return h2h
    }
  
    const questPres = checkQuestProgressAchieved(h2h.PreReqs, questAvailable);
  
    return {
      ...h2h,
      PreReqs: questPres,
      Available: questPres.find((p) => p.completed === false) === undefined
    }
  })
  
  mercMissionAvailable = mercMissionAvailable.map((mm) => {
    if (mm.Prerequisites === undefined || mm.Prerequisites.length === 0) {
      return mm
    }
  
    const questPres = checkQuestProgressAchieved(mm.Prerequisites, questAvailable);
  
    return {
      ...mm,
      Prerequisites: questPres,
      Available: questPres.find((p) => p.completed === false) === undefined
    }
  })
  
  return {
    monsters: monAvailability,
    fieldSkills: fieldSkillTotal,
    blades: bladeAvailable,
    heart2Hearts: heart2HeartAvailable,
    mercMissions: mercMissionAvailable,
    sideQuests: questAvailable
  }
}
  
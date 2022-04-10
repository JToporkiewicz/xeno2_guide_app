import { ReactChild, useContext, useEffect, useRef, useState } from 'react';
import client from '../../api-client';
import { defaultDriverSkillTree, IDriverSkillNode, IDriverSkillTree } from '../../interfaces';
import { LoaderContext } from '../App';
import CollapsibleComponent from '../CommonComponents/Containers/CollapsibleComponent'
import DriverSkillTreeBranch from './DriverSkillsComponents/DriverSkillTreeBranch';
import DriverSkillTreeTierStatus from './DriverSkillsComponents/DriverSkillTreeTierStatus';

const fetchDriverSkillTreeDetails = async (
  setDriverSkillTree:(tree:IDriverSkillTree) => void,
  treeId:number
) => {
  try {
    const response = await client.resource('driverskilltree').get(treeId);
    setDriverSkillTree(response);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

const fetchDriverSkillNodeDetails = async (
  setDriverSkillNodes:(nodes:IDriverSkillNode[]) => void,
  tree:IDriverSkillTree
) => {
  try {
    const tier1Branch1 = await client.resource('driverskillnode').get(tree.Tier1Branch1);
    const tier1Branch2 = await client.resource('driverskillnode').get(tree.Tier1Branch2);
    const tier1Branch3 = await client.resource('driverskillnode').get(tree.Tier1Branch3);
    const tier1Branch4 = await client.resource('driverskillnode').get(tree.Tier1Branch4);
    const tier1Branch5 = await client.resource('driverskillnode').get(tree.Tier1Branch5);
    const tier2Branch1 = await client.resource('driverskillnode').get(tree.Tier2Branch1);
    const tier2Branch2 = await client.resource('driverskillnode').get(tree.Tier2Branch2);
    const tier2Branch3 = await client.resource('driverskillnode').get(tree.Tier2Branch3);
    const tier2Branch4 = await client.resource('driverskillnode').get(tree.Tier2Branch4);
    const tier2Branch5 = await client.resource('driverskillnode').get(tree.Tier2Branch5);
    const tier3Branch1 = await client.resource('driverskillnode').get(tree.Tier3Branch1);
    const tier3Branch2 = await client.resource('driverskillnode').get(tree.Tier3Branch2);
    const tier3Branch3 = await client.resource('driverskillnode').get(tree.Tier3Branch3);
    const tier3Branch4 = await client.resource('driverskillnode').get(tree.Tier3Branch4);
    const tier3Branch5 = await client.resource('driverskillnode').get(tree.Tier3Branch5);
    setDriverSkillNodes([
      tier1Branch1, tier1Branch2, tier1Branch3, tier1Branch4, tier1Branch5,
      tier2Branch1, tier2Branch2, tier2Branch3, tier2Branch4, tier2Branch5,
      tier3Branch1, tier3Branch2, tier3Branch3, tier3Branch4,tier3Branch5
    ]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

interface IProps {
  treeId: number,
  hiddenTree?:boolean
}

const DriverSkillsComponent = (props:IProps) => {
  const [driverSkillTree, setDriverSkillTree] = useState(
    defaultDriverSkillTree as IDriverSkillTree
  );
  const [driverSkillNodes, setDriverSkillNodes] = useState([] as IDriverSkillNode[]);
  const [unlockedTier1, setUnlockedLevel1] = useState(-1);
  const [unlockedTier2, setUnlockedLevel2] = useState(-1);
  const [driverSkills, setDriverSkills] = useState([] as ReactChild[])
  const {loaderState, setLoader} = useContext(LoaderContext);

  const toUpdate = useRef([] as IDriverSkillNode[]);

  useEffect(() => {
    if(props.treeId){
      setLoader(loaderState.concat(['Fetching driver skill tree details']))
      fetchDriverSkillTreeDetails(setDriverSkillTree, props.treeId);
      setLoader(
        loaderState.filter((entry:string) => entry !== 'Fetching driver skill tree details')
      )
    }
  }, [props.treeId])

  useEffect(() => {
    if(driverSkillTree !== defaultDriverSkillTree){
      setLoader(loaderState.concat(['Fetching driver skill node details']))
      fetchDriverSkillNodeDetails(
        setDriverSkillNodes,
        driverSkillTree)
      setLoader(
        loaderState.filter((entry:string) => entry !== 'Fetching driver skill node details')
      )
    }
  }, [driverSkillTree])

  const updateSkillNodes = (id:number, tier:number, unlock: boolean) => {
    let nodes: IDriverSkillNode[] = [];
    if(unlock){
      for (let i = 2; i >= 0; i--) {
        if(id - 5 * i > 0) {
          nodes = nodes.concat(
            driverSkillNodes.filter((node: IDriverSkillNode) => node.id === id - 5 * i)
          );
        }
      }
    } else {
      const newUnlockedTier1 = tier === 1 ? unlockedTier1 - 1 : unlockedTier1;
      const newUnlockedTier2 = tier < 3 ? unlockedTier2 - 1 : unlockedTier2;
      for (let i = 2; i >= 0; i--) {
        nodes = nodes.concat(
          driverSkillNodes.filter((node: IDriverSkillNode) =>
            node.id === id + 5 * i && node.Unlocked)
        );
      }

      if(newUnlockedTier1 < 2) {
        nodes = nodes.concat(
          driverSkillNodes.filter((node:IDriverSkillNode) =>
            !nodes.includes(node) && node.id >= driverSkillNodes[0].id + 4)
        )
      } else if(newUnlockedTier1 + newUnlockedTier2 < 5) {
        console.log(nodes)
        nodes = nodes.concat(
          driverSkillNodes.filter((node:IDriverSkillNode) =>
            !nodes.includes(node) && node.id >= driverSkillNodes[0].id + 9)
        )
        console.log(nodes)
      }
    }
    setDriverSkillNodes(
      driverSkillNodes.filter((node: IDriverSkillNode) => !nodes.includes(node))
        .concat(nodes.map((node: IDriverSkillNode) => ({...node, Unlocked: unlock})))
        .sort((nodeA:IDriverSkillNode, nodeB:IDriverSkillNode) =>
          nodeA.id < nodeB.id ? -1 : nodeA.id > nodeB.id ? 1 : 0)
    )
  }

  useEffect(() => {
    if(driverSkillNodes.length === 15){
      toUpdate.current = driverSkillNodes;
      let unlocked1 = driverSkillNodes.filter((node:IDriverSkillNode) =>
        node.id >= driverSkillNodes[0].id && node.id < driverSkillNodes[5].id
        && node.Unlocked
      ).length;
      let unlocked2 = driverSkillNodes.filter((node:IDriverSkillNode) =>
        node.id >= driverSkillNodes[5].id && node.id < driverSkillNodes[9].id
        && node.Unlocked
      ).length;
      console.log(`tier 1: ${unlocked1}, tier 2: ${unlocked2}`)
      setUnlockedLevel1(unlocked1);
      setUnlockedLevel2(unlocked2);
      setDriverSkills(driverSkillNodes.filter((_, index) => index < 5).map((_, i) => 
        <DriverSkillTreeBranch
          node1={driverSkillNodes[i]}
          node2={driverSkillNodes[i+5]}
          node3={driverSkillNodes[i+10]}
          unlockedTier1={unlocked1}
          unlockedTier2={unlocked2}
          updateSkillNodes={updateSkillNodes}
        />
      )
      )
    }
  }, [driverSkillNodes])

  useEffect(() => {
    return () => {
      setLoader(loaderState.concat(['Updating driver skill tree details']));
      toUpdate.current.map(async (node:IDriverSkillNode) => {
        await client.resource('driverskillnode').update(node.id, node)
      })
      setLoader(
        loaderState.filter((entry:string) => entry !== 'Updating driver skill tree details')
      )
    } 
  }, [])

  return (
    <CollapsibleComponent header={props.hiddenTree ?
      'Driver Hidden Affinity Tree'
      : 'Driver Affinity Tree'}>
      {unlockedTier1 !== -1 && unlockedTier2 !== -1 ? 
        <>
          <DriverSkillTreeTierStatus unlockedTier1={unlockedTier1} unlockedTier2={unlockedTier2} />
          {driverSkills.map((branch, index) => 
            <div key={index}>{branch}</div>)}
        </>
        : <div>Not found</div>
      }

    </CollapsibleComponent>
  )
};

export default DriverSkillsComponent;
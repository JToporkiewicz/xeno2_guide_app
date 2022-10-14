export const processMonsterDropsTable = (input:string) => {
  const el = input
    .trim()
    .replaceAll('Rarity1.png', 'Common (rarity 1)')
    .replaceAll('Rarity2.png', 'Rare (rarity 2)')
    .replaceAll('Rarity3.png', 'Legendary (rarity 3)')
    .split('\n')
    .map((entry) => entry
      .replace('', '{"Name": "')
      .replace(' \t', '", "Type": "')
      .replace(' \t', '", "Rarity": "')
      .replace(' \t', '", "Rate": "')).join('"},')
  console.log('['+el+'"}]')    
}


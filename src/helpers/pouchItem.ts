export const processPouchItemEffects = (input: string) => {
  let itemDetails = input.split('\n\n')

  let effects = '["'+ itemDetails[0].trim().split('\n')
    .map((el) => el.trim()).join('","') + '"]'

  let trust = itemDetails[1].replace('Increases trust by', ', "Trust": ')
    .replace(' on use. Duration of ', ', "Duration": "')
    .trim()
    .replace('.', '');

  console.log('{"Effects": ' + effects + trust + '"}');
}
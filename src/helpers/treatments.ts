export const treatments = [
  'Дамы и господа',
  'Mадам и месье',
  'Леди и джентeльмены',
  'Друзья',
  'Ребятки',
  'Дорогие мои',
  'Гайз',
  'Котики',
  'Птички мои',
  'Малята',
  'Бусинки',
  'Мальчики и девочки'
]

export const addTreatment = (message: string) => {
  return () => {
    const treatment = treatments[Math.floor(Math.random() * treatments.length)]
    return encodeURI(treatment) + ', ' + message
  }
}
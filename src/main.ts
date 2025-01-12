import { brands } from './brands'
import './styles/main.scss'

export function getBrands(){
  const listContainer = document.createElement('ul')

  brands.forEach(element => {
    let itemNode = document.createElement('li')
    itemNode.innerHTML = element.humanReadable
    listContainer.append(itemNode)
  });
  return listContainer
}

function createPillItem(
  item: { brandName: string; mdiIcon: string | null; humanReadable: string },
  options: { 
    rounded?: boolean; 
    spacing?: 'small' | 'medium' | 'large'
    iconsEnabled?: boolean;
  } = {}
) {
  const { rounded = false, spacing = 'small' } = options

  const element = document.createElement('div')
  let iconElement;
  element.className = `brandpill ${item.brandName}`

  // If there's an icon
  if (item.mdiIcon && item.mdiIcon.trim() !== '') {
    element.classList.add('icon')
    iconElement = document.createElement('i');
    iconElement.classList.add('mdi', item.mdiIcon)
    element.prepend(iconElement)
  }

  if (rounded) {
    element.classList.add('rounded')
  }

  if (['small', 'medium', 'large'].includes(spacing)) {
    element.classList.add('spaced-' + spacing)
  }

  element.append(item.humanReadable)
  return element
}

export function createPills(
  brandListInput: string[] | null = null,
  options: { 
    rounded?: boolean; 
    spacing?: 'small' | 'medium' | 'large' 
    align?: 'left' | 'center' | 'centre' | 'right'
  } = {}
) {
  const { rounded = false, spacing = 'small', align = 'left' } = options

  // Use a map for quicker lookup.
  const brandsMap = new Map()
  brands.forEach((brand) => brandsMap.set(brand.brandName, brand))

  // valid inputs for aligment are
  const valuesAlign = new Set(["left", "center", "centre", "right"])


  // Container for our pills
  const container = document.createElement('div')
  container.classList.add('brandpill-container')
  if(valuesAlign.has(align)){
    container.classList.add(align)
  }else{
    console.warn('CodePills: None Valid value entered for alignment, not applied.')
  }

  const pills: Array<Node> = [];

  const matchingBrands = brandListInput
    ? brandListInput.map((name) => brandsMap.get(name))
    : brands;

  if(!brandListInput || brandListInput.length === 0){
    brands.forEach(item => {
      const pill = createPillItem(item, { rounded, spacing })
      pills.push(pill)      
    })
  } else {
    matchingBrands.forEach((item) => {
      if (item) {
        const pill = createPillItem(item, { rounded, spacing })
        pills.push(pill);
      }
    })
  }


  pills.forEach((pill) => {
    container.appendChild(pill)
  });

  return container
}
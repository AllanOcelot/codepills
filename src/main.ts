import { brands } from './brands'
import './styles/main.scss'

function createPillItem(item: {brandName: string, mdiIcon: string | null, humanReadable: string}, rounded: Boolean | null = false, spacing: string | null = 'small'){
  const element = document.createElement('div')
  let iconElement;
  element.className = `brandpill ${item.brandName}`

  // If there's an icon
  if(item.mdiIcon){
    element.classList.add('icon')
    iconElement = document.createElement('i')
    iconElement.classList.add('mdi', item.mdiIcon)
    element.prepend(iconElement)
  }

  if(rounded){
    element.classList.add('rounded')
  }


  if(spacing === 'small' || spacing === 'medium' || spacing === 'large'){
      element.classList.add('spaced-' + spacing)
  }

  element.append(item.humanReadable)
  return element
}

export function createPills(brandListInput: [string], rounded: Boolean | null = false, spacing: string | null = 'small'){
  // Use a map for quicker lookup.
  const brandsMap = new Map()
  brands.forEach(brand => brandsMap.set(brand.brandName, brand));


  // Container for our pills
  const container = document.createElement('div'); 
  container.classList.add('brandpill-container'); 

  const pills: Array<Node> = []

  if(brandListInput){
    const matchingBrands = brandListInput.map(name => brandsMap.get(name));
    matchingBrands.forEach( item => {
      const pill = createPillItem(item, rounded, spacing)
      pills.push(pill)
    })
  }else{
    brands.forEach( item => {
      pills.push(createPillItem(item))
    })
  }

  pills.forEach( pill => {
    container.appendChild(pill)
  })

  return container
}
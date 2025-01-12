import { brands } from './brands'
import './styles/main.scss'

function createPillItem(
  item: { brandName: string; mdiIcon: string | null; humanReadable: string },
  options: { rounded?: boolean; spacing?: 'small' | 'medium' | 'large' } = {}
) {
  const { rounded = false, spacing = 'small' } = options

  const element = document.createElement('div')
  let iconElement;
  element.className = `brandpill ${item.brandName}`

  // If there's an icon
  if (item.mdiIcon) {
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
  options: { rounded?: boolean; spacing?: 'small' | 'medium' | 'large' } = {}
) {
  const { rounded = false, spacing = 'small' } = options

  // Use a map for quicker lookup.
  const brandsMap = new Map()
  brands.forEach((brand) => brandsMap.set(brand.brandName, brand))

  // Container for our pills
  const container = document.createElement('div')
  container.classList.add('brandpill-container')

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
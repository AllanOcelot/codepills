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


// If the user has provided a list of brands, let's sanitise them to be sure we get a match where possible.
function cleanBrandInput(inputArray: string[]){
  if(inputArray){
    let newArray: string[] = []
    inputArray.forEach( (item, index) => {
      let inputString = item.trim().toLowerCase()
        // Remove periods, user may type 'vue.js' for example
        if(inputString.includes('.')){
          inputString = inputString.replace(/\./g, '')
        }
        newArray.push(inputString)
    })
    return newArray
  }
  return null
}

function createPill(
  item: { brandName: string; mdiIcon: string | null; humanReadable: string, url: string },
  options: { 
    links?:   boolean
    rounded?: boolean
    outline?: boolean
    spacing?: 'small' | 'medium' | 'large'
    iconsEnabled?: boolean
    text?: boolean
  } = {}){

  // Deconstruct the options, set default values on items
  const {
    links   = false,
    rounded = false,
    outline = false,
    spacing = 'small', 
    iconsEnabled = true,
    text = true
  } = options

  let element: HTMLElement | HTMLAnchorElement;

  if(links && links === true){
    const anchorElement = document.createElement('a') as HTMLAnchorElement
    anchorElement.href = item.url
    anchorElement.target  = "_blank"
    anchorElement.title = item.humanReadable
    anchorElement.classList.add('link')
    element  = anchorElement
    console.log(element)
  } else {
    element = document.createElement('div')
  }

  let iconElement;
  element.className = `brandpill ${item.brandName}`

  // If there's an icon
  if (iconsEnabled && item.mdiIcon && item.mdiIcon.trim() !== '') {
    element.classList.add('icon')
    iconElement = document.createElement('i');
    iconElement.classList.add('mdi', item.mdiIcon)
    element.prepend(iconElement)
  }

  if (rounded) {
    element.classList.add('rounded')
  }

  if(outline) {
    element.classList.add('outline')
  }

  if(['small', 'medium', 'large'].includes(spacing)) {
    element.classList.add('spaced-' + spacing)
  }

  if(text){
    let readableText = document.createElement('span')
    readableText.innerText = item.humanReadable
    element.append(readableText)
  }else{
    element.classList.add('no-text')
  }

  return element
}



export function createPills(
  brandListInput: string[] | null = null,
  options: { 
    links?:   boolean
    rounded?: boolean
    outline?: boolean
    spacing?: 'small' | 'medium' | 'large' 
    align?: 'left' | 'center' | 'centre' | 'right'
    iconsEnabled?: boolean,
    text?: boolean,
  } = {}){

  // deconstruct from options
  const { 
    links   = false,
    rounded = false,
    outline = false,
    spacing = 'small', 
    align = 'left',
    iconsEnabled = true,
    text = true
  } = options

  // HTML node elements we inject into each other or DOM
  const pills: Array<Node> = [];
  const container = document.createElement('div')


  // valid inputs for alignment are
  const valuesAlign = new Set(["left", "center", "centre", "right"])

  // map our brands for quicker lookup
  const brandsMap = new Map()
  brands.forEach((brand) => brandsMap.set(brand.brandName, brand))
  // the results of our search on user provided input

  const matchingBrands = brandListInput ? cleanBrandInput(brandListInput).map((name) => brandsMap.get(name)): brands;


  // Container for our pills
  container.classList.add('brandpill-container')
  if(valuesAlign.has(align)){
    container.classList.add(align)
  }else{
    console.log('CodePills: None Valid value entered for alignment, not applied.')
  }

  // If user does not provide
  if(!brandListInput || brandListInput.length === 0){
    brands.forEach(item => {
      const pill = createPill(item, { links, rounded, outline, spacing, iconsEnabled, text })
      pills.push(pill)      
    })
  } else {
    matchingBrands.forEach((item) => {
      if (item) {
        const pill = createPill(item, { links, rounded, outline, spacing, iconsEnabled, text })
        pills.push(pill);
      }
    })
  }


  pills.forEach((pill) => {
    container.appendChild(pill)
  });

  return container
}
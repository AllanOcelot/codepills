import { brands } from './brands'
import './styles/main.scss'

// A list of animations currently in BrandPills
const preDefinedAnimationsList = ['fade']

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
  item: { brandName: string; mdiIcon: string | null; humanReadable: string, url: string, color: string, brandPrimary: string },
  options: { 
    links?:   boolean
    rounded?: boolean
    outline?: boolean
    spacing?: 'small' | 'medium' | 'large'
    iconsEnabled?: boolean
    text?: boolean
    gradient?: boolean
    animation? : 'fade' | null
  } = {}){

  // Deconstruct the options, set default values on items
  const {
    links   = false,
    rounded = false,
    outline = false,
    spacing = 'small', 
    iconsEnabled = true,
    text = true,
    gradient = false,
    animation = ''
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

  // Basic element styling.
  if(!outline){
    element.style.backgroundColor  = item.brandPrimary
  }
  if(item.color){
    element.style.color = item.color
  }
  if(outline){
    element.style.color = item.brandPrimary
  }

  element.style.borderColor   = item.brandPrimary
 
  // Icon 
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

  if(gradient){
    console.log(gradient)
    element.classList.add('gradient')
  }

  if(['small', 'medium', 'large'].includes(spacing)) {
    element.classList.add('spaced-' + spacing)
  }

  if(text || !text && !iconsEnabled){
    let readableText = document.createElement('span')
    readableText.innerText = item.humanReadable
    element.append(readableText)
  }else{
    element.classList.add('no-text')
  }


  // If The User Has Animations, we should add the corrosponding "Starting" class to each item here.
  // Then loop over it in the create method to init the anim for each item.
  if(animation && preDefinedAnimationsList.includes(animation.toLocaleLowerCase()) )  {
    console.log('animation arg')
    element.classList.add('animation')
    element.classList.add('animation-' + animation)
  }

  return element
}



export function createBrandPills(
  element: HTMLElement, 
  brandListInput: string[] | null = null,
  options: { 
    random?: boolean,
    links?:   boolean
    rounded?: boolean
    outline?: boolean
    spacing?: 'small' | 'medium' | 'large' 
    align?: 'left' | 'center' | 'centre' | 'right'
    iconsEnabled?: boolean,
    text?: boolean,
    gradient?: boolean,
    animation? : 'fade'
  } = {}){

  // deconstruct from options
  const { 
    random  = false,
    links   = false,
    rounded = false,
    outline = false,
    spacing = 'small', 
    align = 'left',
    iconsEnabled = true,
    text = true,
    gradient = false,
    animation = null
  } = options

  // HTML node elements we inject into each other or DOM
  let pills: Array<Node> = [];
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
      const pill = createPill(item, { links, rounded, outline, spacing, iconsEnabled, text, gradient, animation })
      pills.push(pill)      
    })
  } else {
    matchingBrands.forEach((item) => {
      if (item) {
        const pill = createPill(item, { links, rounded, outline, spacing, iconsEnabled, text, gradient , animation })
        pills.push(pill);
      }
    })
  }


  if(random){
    const shuffleArray = (pills: Array<Node>) => pills.sort(() => Math.random() - 0.5)
    pills = shuffleArray([...pills])
  }


  console.log('animation value is')
  console.log(animation)

  pills.forEach((pill, index) => {
    container.appendChild(pill)

    // If animation is enabled, each pill should have an active class added to it after X
    if(animation && preDefinedAnimationsList.includes(animation.toLocaleLowerCase()) )
    window.setTimeout(() => {
      container.getElementsByClassName('brandpill')[index].classList.add('active')
    }, 420 * index)
  })

  // populate the dom element given to us.
  element.append(container)
}
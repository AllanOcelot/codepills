import { brands } from './brands'
import './styles/main.scss'



const container = document.createElement('div'); 
container.classList.add('brandpill-container'); 
brands.forEach(item => {
  const element = document.createElement('div')
  let iconElement;
  element.className = `brandpill ${item.brandName}`
  if(item.isDark === true ){
    element.className += ' brandpill-dark'
  }


  if(item.mdiIcon){
    iconElement = document.createElement('i')
    iconElement.classList.add('mdi', item.mdiIcon)
    element.prepend(iconElement)
  }

  element.append(item.humanReadable)

  container.appendChild(element)
});

document.body.appendChild(container)
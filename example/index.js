import { getBrands, createBrandPills } from '/src/main.ts'

    //console.log(getBrands())

    const exampleBrands = ['VUE.JS', 'digitalocean', 'vite', 'gatsby', 'tailwindcss', 'netlify', 'php']

    // providing a function to quickly allow people to populate elements via js rather than manually typing out our classes
    createBrandPills(document.getElementById('example1'), [],{rounded: true, spacing: 'medium', align: 'center'})

    // specific list
    createBrandPills(document.getElementById('example2'), exampleBrands)

    // rounded pills
    createBrandPills(document.getElementById('example3'), exampleBrands,{ rounded: true })

    // spacing example
    createBrandPills(document.getElementById('example4'), exampleBrands, { spacing: 'large' })

    // Alignment 
    const exampleAlign = ['html','css3','python','aspnet']
    createBrandPills(document.getElementById('example5'), exampleAlign, { align: 'left' })
    createBrandPills(document.getElementById('example6'), exampleAlign, { align: 'center' })
    createBrandPills(document.getElementById('example7'), exampleAlign, { align: 'right' })

    // Icons disabled
    createBrandPills(document.getElementById('example8'), exampleAlign, { iconsEnabled: false })

    // outline enabled
    createBrandPills(document.getElementById('example9'), exampleAlign, { outline: true })

    // links enabled
    createBrandPills(document.getElementById('example10'), exampleAlign, { links: true })

    // text enabled
    createBrandPills(document.getElementById('example11'), exampleAlign, { text: false })

    // Random enabled
    createBrandPills(document.getElementById('example12'), exampleBrands, { random: true })


    const animationButton1 = document.getElementById('example13Button')
          animationButton1.addEventListener('click', () => { AppendAnimation(document.getElementById('example13'), 'fade') } );


    // Random enabled
    function AppendAnimation(idOfElement, animationName){
      createBrandPills(idOfElement, exampleBrands, { animation: animationName })
    }
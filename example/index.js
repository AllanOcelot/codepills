import { getBrands, createPills } from '/src/main.ts'

    //console.log(getBrands())

    const exampleBrands = ['VUE.JS', 'digitalocean', 'vite', 'gatsby', 'tailwindcss', 'netlify', 'php']

    // providing a function to quickly allow people to populate elements via js rather than manually typing out our classes
    document.getElementById('example1').append(createPills([],{rounded: true, spacing: 'medium', align: 'center'}))

    // specific list
    document.getElementById('example2').append(createPills(exampleBrands))

    // rounded pills
    document.getElementById('example3').append(createPills(exampleBrands,{ rounded: true }))

    // spacing example
    document.getElementById('example4').append(createPills(exampleBrands, { spacing: 'large' }))

    // Alignment 
    const exampleAlign = ['html','css3','python','aspnet']
    document.getElementById('example5').append(createPills(exampleAlign, { align: 'left' }))
    document.getElementById('example6').append(createPills(exampleAlign, { align: 'center' }))
    document.getElementById('example7').append(createPills(exampleAlign, { align: 'right' }))

    document.getElementById('example8').append(createPills(exampleAlign, { iconsEnabled: false }))
    
    document.getElementById('example9').append(createPills(exampleAlign, { outline: true }))
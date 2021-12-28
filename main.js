let modal = document.getElementById('myModal')
let input =document.getElementById("input")
let cocktailsBlock = document.querySelector('.cocktailsBlock')
let instructionText = document.querySelector('.instructionText')
let ingredientsInfo = document.querySelector('.ingredientsInfo')
let preloader = document.getElementById('preloader')
document.body.onload=()=>{
    setTimeout(()=>{
        if(!preloader.classList.contains('done')){
            preloader.classList.toggle('done')
        }
    }, 200)
}

const modalSwitchOff = () => {
    modal.style.display='none'
}

const cocktails = async ()=>{
    preloader.classList.toggle('done')
    try{
        const data =await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+input.value)
        const response = await data.json()
        cocktailsBlock.innerHTML=''
        for(let i =0; i<response.drinks.length; i++){
            let cocktailInfo = document.createElement('div')
            let img = document.createElement('img')
            let name = document.createElement('a')

            name.setAttribute('onclick', "cocktailIngredients(this.innerText)")
            img.setAttribute('src', response.drinks[i].strDrinkThumb)

            name.className='name'
            cocktailInfo.className='cocktailInfo'

            name.innerText=response.drinks[i].strDrink

            cocktailInfo.append(img)
            cocktailInfo.append(name)

            cocktailsBlock.append(cocktailInfo)
        }
    }catch (e) {
        console.log(e)
        alert(`Error 404
Not found`)
    }
    preloader.classList.toggle('done')
}
const cocktailIngredients = async (name) => {
    try{
        const data =await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+name)
        const response = await data.json()
        instructionText.innerHTML=''
        ingredientsInfo.innerHTML=''
        let instruction = document.createElement('p')

        let i = 1
        let array =[]
        let drink = response.drinks[0]
        while (drink['strIngredient'+i]) {
            array.push({name: drink['strIngredient'+i], measure: drink['strMeasure'+i]?drink['strMeasure'+i]:''})
            i++
        }
        array.forEach((ingredient)=> {
            let ingredients = document.createElement('div')
            let img = document.createElement('img')
            let ingredientText = document.createElement('p')

            img.className='ingredientImg'
            ingredients.className='ingredients'
            img.setAttribute('src', 'https://www.thecocktaildb.com/images/ingredients/'+ingredient.name+'-Medium.png')
            ingredientText.innerText=`${ingredient.name} ${ingredient.measure}`

            ingredients.append(img)
            ingredients.append(ingredientText)

            ingredientsInfo.append(ingredients)

        })

        instruction.innerText=response.drinks[0].strInstructions
        instructionText.append(instruction)
        modal.style.display='block'
    }catch (e) {
        console.log(e)
    }
}

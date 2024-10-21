//All pages
//console.log("Test")
const div = document.querySelector('#welcome')
const hours = new Date().getHours()
const isMorning = hours >= 4 && hours < 12
const isAfternoon = hours >= 12 && hours < 17
const isEvening = hours >= 17 || hours < 4
if (isMorning){
    div.textContent = "Good Morning"
}
if(isAfternoon){
    div.textContent = "Good Afternoon"
}
if(isEvening){
    div.textContent = "Good Evening"
}
//localStorage.setItem("It's a secret to everybody.","It's not secure to everybody.")

//Image Carousel 
if(document.title == "Image Carousel"){
    const urls = [
        'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ].map(url => { (new Image()).src = url; return url })

    const images = document.querySelectorAll('#carousel img')

    let currentImage = 0
    const showImages = () => {
        const offset = currentImage % urls.length
        images.forEach((image, index) => {
            const imageIndex = (index + offset + urls.length) % urls.length
            image.src = urls[imageIndex]
        })
    }
    showImages()
    setInterval(()=>{
        currentImage++
        showImages();
    },5000)
    document.querySelector("#prev").addEventListener("click",()=>{
        currentImage--
        showImages()
    })
    document.querySelector("#next").addEventListener("click",()=>{
        currentImage++
        showImages()
    })
}

//To-Do List
if (document.title == "To-Do List"){
    const todoinput = document.querySelector("#new-todo")
    const todoList = document.querySelector(".todo-list")
    renderTodos = () =>{
        todoList.innerHTML = ' '
        JSON.parse(localStorage.getItem('todo-list')).forEach(({text})=>{
            const li = document.createElement('li')
            li.textContent = text
            todoList.append(li)
        })}
    let todos = localStorage.getItem('todo-list')||[]
    if(todos == localStorage.getItem('todo-list'))renderTodos()
    document.querySelector("#toDoButton").addEventListener("click",()=>{
        let todos = JSON.parse(localStorage.getItem('todo-list'))||[]
        todos.push({text:todoinput.value, completed:false})
        localStorage.setItem('todo-list',JSON.stringify(todos))
        renderTodos()
    })
}

//Homepage (API-Fetch)
if (document.title == "Homepage"){
    const img = document.createElement("img")
    const div = document.querySelector("#pokeAPI")
    const getRandomPokemon = async () =>{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+Math.floor(Math.random()*150))
        const data = await response.json()
        return data
    }
    const renderPokemon = pokemon =>{
        img.src = pokemon.sprites.front_default
        img.alt = pokemon.name
        div.append(img)
    }
    (async()=>{
        try{
            const randomPokemon = await getRandomPokemon()
            renderPokemon(randomPokemon)
        }catch{
            console.log("Error getting and loading pokemon")
        }
    })()
}
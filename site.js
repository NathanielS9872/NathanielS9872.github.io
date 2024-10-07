//Homepage
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

//todo-list
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
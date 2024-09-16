console.log("Test")
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

localStorage.setItem("It's a secret to everybody.","It's not secure to everybody.")
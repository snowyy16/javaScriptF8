const timerEL = document.getElementById('timer');
const startEL = document.getElementById('start');
const stopEL = document.getElementById('stop');
const resetEL = document.getElementById('reset');

let interval;
let timeLeft = 1500;

updateTimer = () => {
    let minutes = Math.floor(timeLeft/60)
    let seconds = timeLeft % 60
    let formattedTime = `${minutes.toString().padStart(2,"0")}:${seconds
        .toString()
        .padStart(2,"0")}`
    timerEL.innerHTML=formattedTime 
}

startTimer = () => {
    interval = setInterval(()=>{
        timeLeft--;
        updateTimer();
        if(timeLeft===0){
            clearInterval(interval);
            alert("TIme's up")
            timeLeft=1500;
            updateTimer();
        }
    },1000)
}

stopTimer = () => {
    clearInterval(interval)
}

resetTimer = () => {
    clearInterval(interval);
    timeLeft=1500;
    updateTimer();
}

startEL.addEventListener('click',startTimer)
stopEL.addEventListener("click",stopTimer)
resetEL.addEventListener("click",resetTimer)


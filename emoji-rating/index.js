const starsEL = document.querySelectorAll('.fa-star');
const emojisEL = document.querySelectorAll('.far');
const colorsArray = ["red", "orange", "lightblue", "lightgreen", "green"];

updateRating(0)

starsEL.forEach((starEL, index) => {
    starEL.addEventListener('click', () => {
        updateRating(index);
    })
})

function updateRating(index) {
    starsEL.forEach((starEL, i) => {
        if(i < index + 1){
            starEL.classList.add('active');
        }else{
            starEL.classList.remove('active');
        }
    })
    emojisEL.forEach((emojiEL) => {
        emojiEL.style.transform = `translateX(-${index * 50}px)`;  
        emojiEL.style.color = colorsArray[index];  
    })
}
const searchBarEL = document.querySelector('search-bar-container');
const magnifierEL = document.querySelector('.magnifier');

magnifierEL.addEventListener('click', () => {
    magnifierEL.classList.toggle('active');
    alert('Search clicked');
})
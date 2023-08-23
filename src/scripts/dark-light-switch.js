const root = document.querySelector(':root');
const checkbox = document.querySelector('.js-toggle-btn');

checkbox.addEventListener('change',() => {
    root.classList.toggle('dark'); 
})

console.log(root);
console.log(checkbox);
console.log(checkbox.checked)
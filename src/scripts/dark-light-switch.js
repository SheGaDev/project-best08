const root = document.querySelector(':root');
const toggleBtn = document.querySelector('.toggle-switch');
const checkboxes = document.querySelectorAll('.js-toggle-btn');

if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
}

const theme = localStorage.getItem("theme");
updateUI(theme);

checkboxes.forEach(checkbox => checkbox.addEventListener('change',(event) => {
    let theme = event.target.checked ? "dark" : "light";
    updateUI(theme) 
}))

function updateUI(theme){

    if(theme==="dark"){
        checkboxes.forEach((checkbox) => { checkbox.checked = true});
        root.classList.add('dark'); 
        localStorage.setItem("theme", "dark");
    }
    else{
        checkboxes.forEach((checkbox) => { checkbox.checked = false});
        root.classList.remove('dark'); 
        localStorage.setItem("theme", "light");
    }
    toggleBtn.classList.remove("hideBtn");
}
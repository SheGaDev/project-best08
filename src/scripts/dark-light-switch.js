const root = document.querySelector(':root');
const checkboxes = document.querySelectorAll('.js-toggle-btn');

checkboxes.forEach(checkbox => checkbox.addEventListener('change',(event) => {
    if(event.target.checked){
        checkboxes.forEach((checkbox) => { checkbox.checked = true});
        root.classList.add('dark'); 

    }
    else{
        checkboxes.forEach((checkbox) => { checkbox.checked = false});
        root.classList.remove('dark'); 
    }
}))
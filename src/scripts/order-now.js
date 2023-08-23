import { refs } from '@/lib/api/refs';
console.log(refs.modal);
console.log(refs.openModalBtn);
console.log(refs.closeModalBtn);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  
}

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

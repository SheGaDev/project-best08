import { refs } from '@/lib/api/refs';
import { asyncToggleFavoriteItem } from '@/lib/utils/local-storage-service';
function toggleModal() {
  const isOpen = refs.modal.getAttribute('aria-expanded') === 'true';
  refs.modal.setAttribute('aria-expanded', !isOpen);
  refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('no-scroll');
  refs.modal.addEventListener('click', onBgClick);
}
function onBgClick(e) {
  e.stopPropagation();
  if (e.target === e.currentTarget) toggleModal();
}

refs.openModalBtn.addEventListener('click', toggleModal);
refs.heroModalOpen.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

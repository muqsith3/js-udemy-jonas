'use strict';

// menselect element ke dalam variabel
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const showModals = document.querySelectorAll('.show-modals');

const openModal = function () {
  // menghapus class hidden
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < showModals.length; i++) {
  showModals[i].addEventListener('click', openModal);

  // function untuk menambah/menghapus class hidden
  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  // ketika btn close di klik
  btnCloseModal.addEventListener('click', closeModal);
  // ketika overlay di klik
  overlay.addEventListener('click', closeModal);

  // menggunakan keyboard ESC
  document.addEventListener('keydown', function (e) {
    // menangkap keyboard esc di takan
    if (e.key === 'Escape' && ~modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

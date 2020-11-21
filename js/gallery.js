import images from '../gallery-items.js';

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayModal = document.querySelector('.lightbox__overlay');

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(images);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
btnCloseModal.addEventListener('click', onBtnCloseModalClick);
overlayModal.addEventListener('click', onOverlayModalClick);

function createGalleryCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  window.addEventListener('keydown', onEscKeyPress);

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  modal.classList.add('is-open');

  modalImage.src = evt.target.dataset.source;
}

function onBtnCloseModalClick(evt) {
  window.removeEventListener('keydown', onEscKeyPress);

  modal.classList.remove('is-open');
  modalImage.src = '';
}

function onOverlayModalClick(evt) {
  modal.classList.remove('is-open');
  modalImage.src = '';
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onBtnCloseModalClick();
  }
}

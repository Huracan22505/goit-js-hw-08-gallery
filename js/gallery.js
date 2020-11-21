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

function createGalleryCardsMarkup(images, i) {
  i = 0;
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
      data-index="${(i += 1)}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);

  modal.classList.add('is-open');

  modalImage.src = evt.target.dataset.source;
}

function onBtnCloseModalClick(evt) {
  window.removeEventListener('keydown', onEscKeyPress);

  modal.classList.remove('is-open');
  modalImage.src = '';
}

function onOverlayModalClick(evt) {
  onBtnCloseModalClick();
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onBtnCloseModalClick();
  }
}

import images from '../gallery-items.js';

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayModal = document.querySelector('.lightbox__overlay');

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(images);
let currentIndex = 0;

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
btnCloseModal.addEventListener('click', onBtnCloseModalClick);
overlayModal.addEventListener('click', onOverlayModalClick);

function createGalleryCardsMarkup(images) {
  return images
    .map(({ preview, original, description }, i) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${i}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  currentIndex = Number(evt.target.getAttribute('data-index'));

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onRightPress);
  window.addEventListener('keydown', onLeftPress);
  modal.classList.add('is-open');

  modalImage.src = evt.target.dataset.source;
}

function onBtnCloseModalClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onRightPress);
  window.removeEventListener('keydown', onLeftPress);
  modal.classList.remove('is-open');

  modalImage.src = '';
}

function onOverlayModalClick() {
  onBtnCloseModalClick();
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    onBtnCloseModalClick();
  }
}

function onRightPress(evt) {
  if (evt.code === 'ArrowRight') {
    currentIndex += 1;
    if (currentIndex === images.length) {
      currentIndex = 0;
    }
    modalImage.src = images[currentIndex].original;
  }
}

function onLeftPress(evt) {
  if (evt.code === 'ArrowLeft') {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    modalImage.src = images[currentIndex].original;
  }
}

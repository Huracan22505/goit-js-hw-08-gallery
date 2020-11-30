import images from '../gallery-items.js';

// index for slider //
let currentIndex = 0;

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const overlayModal = document.querySelector('.lightbox__overlay');

const btnCloseModal = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const btnSlideLeft = document.querySelector('button[data-action="left-arrow"]');
const btnSlideRight = document.querySelector(
  'button[data-action="right-arrow"]',
);

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(images);

function createGalleryCardsMarkup(images) {
  return images
    .map(({ preview, original, description }, i) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      loading="lazy"
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
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
btnCloseModal.addEventListener('click', onBtnCloseModalClick);
overlayModal.addEventListener('click', onOverlayModalClick);

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  currentIndex = Number(evt.target.getAttribute('data-index'));

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onRightPress);
  window.addEventListener('keydown', onLeftPress);
  btnSlideLeft.addEventListener('click', onLeftSliderClick);
  btnSlideRight.addEventListener('click', onRightSliderClick);

  modal.classList.add('is-open');

  modalImage.src = evt.target.dataset.source;
}

function remover() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onRightPress);
  window.removeEventListener('keydown', onLeftPress);
  btnSlideLeft.removeEventListener('click', onLeftSliderClick);
  btnSlideRight.removeEventListener('click', onRightSliderClick);

  modal.classList.remove('is-open');

  modalImage.src = '';
}

function onBtnCloseModalClick() {
  remover();
}

function onOverlayModalClick() {
  remover();
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    remover();
  }
}

function onRightPress(evt) {
  if (evt.code === 'ArrowRight') {
    onRightSliderClick();
  }
}

function onLeftPress(evt) {
  if (evt.code === 'ArrowLeft') {
    onLeftSliderClick();
  }
}

function onRightSliderClick() {
  currentIndex += 1;
  if (currentIndex === images.length) {
    currentIndex = 0;
  }
  modalImage.src = images[currentIndex].original;
}

function onLeftSliderClick() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImage.src = images[currentIndex].original;
}

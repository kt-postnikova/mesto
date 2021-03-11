// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
//   overlayHandler(popup, 'add');
// }

// function overlayHandler(popup, state) {
//   const activeOverlay = popup.querySelector('.popup__overlay');
//   if (state === 'add') {
//     activeOverlay.addEventListener('mousedown', closePopupByOverlayClick);
//   }
//   else if (state === 'remove') {
//     activeOverlay.removeEventListener('mousedown', closePopupByOverlayClick);
//   }
// }

// export function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
//   overlayHandler(popup, 'remove');
// }

// function closePopupByEsc(evt) {
//   const activePopup = document.querySelector('.popup_opened');
//   if (evt.key === 'Escape') {
//     closePopup(activePopup);
//   }
// }

// function closePopupByOverlayClick() {
//   const activePopup = document.querySelector('.popup_opened');
//   closePopup(activePopup);
// }


// class Popup {
//   constructor(popupSelector) {
//     this.popupSelector = popupSelector
//   }

//   open() {

//   }

//   close() {

//   }

//   _handleEscClose() {

//   }

//   setEventListeners() {

//   }
// }
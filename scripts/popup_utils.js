const closeButtons = document.querySelectorAll(".popup__close-btn");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  setListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeListeners(popup);
}
function setListeners(popup) {
  popup.addEventListener("click", addClickOverlayListener);
  window.addEventListener("keydown", addEscapeWindowListener);
}
function removeListeners(popup) {
  popup.removeEventListener("click", addClickOverlayListener);
  window.removeEventListener("keydown", addEscapeWindowListener);
}

function addEscapeWindowListener(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}
function addClickOverlayListener(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
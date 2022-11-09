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
  popup.addEventListener("mousedown", handleOverlay);
  window.addEventListener("keydown", handleEscapeKey);
}
function removeListeners(popup) {
  popup.removeEventListener("mousedown", handleOverlay);
  window.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

export { openPopup, closePopup };

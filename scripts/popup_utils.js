function openPopup(popup) {
  popup.classList.add("popup_opened");
  setListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeListeners(popup);
}
function setListeners(popup){
  popup.addEventListener("click",addClickOverlayListener);
  window.addEventListener("keydown",addEscapeWindowListener);
}
function removeListeners(popup){
  popup.removeEventListener("click",addClickOverlayListener);
  window.removeEventListener("keydown",addEscapeWindowListener);
}

function addEscapeWindowListener(evt){
  const openPopup = document.querySelector(".popup_opened");
  if(evt.key === "Escape"){
    closePopup(openPopup);
}
}
function addClickOverlayListener(evt){
  if(evt.target.classList.contains("popup_opened")){
    closePopup(evt.target);
  }
}
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".form");
let editBtn = document.querySelector(".profile-info__edit-button");
let closeBtn = document.querySelector(".popup__close-btn");
let nameInput = document.querySelector(".form__input_type_name");
let jobInput = document.querySelector(".form__input_type_description");
let profileName = document.querySelector(".profile-info__name");
let profileDescription = document.querySelector(".profile-info__description");
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

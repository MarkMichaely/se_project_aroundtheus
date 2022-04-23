let editPopup = document.querySelector(".edit-popup");
let formElement = document.querySelector(".edit-form");
let editBtn = document.querySelector(".profile-info__edit-button");
let closeEditBtn = document.querySelector(".popup__close-btn_type_edit");
let nameInput = document.querySelector(".form__input_type_name");
let jobInput = document.querySelector(".form__input_type_description");
let profileName = document.querySelector(".profile-info__name");
let profileDescription = document.querySelector(".profile-info__description");
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editPopup.classList.add("popup_opened");
}
function closeEditPopup() {
  editPopup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeEditPopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
editBtn.addEventListener("click", openEditPopup);
closeEditBtn.addEventListener("click", closeEditPopup);

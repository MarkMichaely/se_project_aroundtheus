const editPopup = document.querySelector(".popup_type_edit");
const formProfileElement = document.querySelector(".form_type_edit");
const profileFormEditBtn = document.querySelector(".profile-info__edit-button");
const profilCloseEditBtn = document.querySelector(
  ".popup__close-btn_type_edit"
);
const profileNameInput = document.querySelector(".form__input_type_name");
const profileJobInput = document.querySelector(".form__input_type_description");
const profileName = document.querySelector(".profile-info__name");
const profileDescription = document.querySelector(".profile-info__description");
function handleEditButtonClick() {
  fillProfileForm();
  openPopup(editPopup);
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;

  closePopup(editPopup);
}

formProfileElement.addEventListener("submit", handleProfileFormSubmit);
profileFormEditBtn.addEventListener("click", handleEditButtonClick);
profilCloseEditBtn.addEventListener("click", () => closePopup(editPopup));

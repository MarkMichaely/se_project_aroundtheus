const editFormElement = document.querySelector(".form_type_edit");
const cardFormElement = document.querySelector(".form_type_card");
const cardFormInput = cardFormElement.querySelector(".form__input");
const cardFormError = cardFormElement.querySelector(
  `.${cardFormInput.id}-error`
);

function showError(form, input, errorMessage) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add("form__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
}

function hideError(form, input) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
  formError.textContent = "";
}
function toggleButtonState(inputList, formButton) {
  if (hasInvalidInput(inputList)) {
    formButton.classList.add("form__button_disabled");
  } else {
    formButton.classList.remove("form__button_disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function checkInputValidity(form) {
  const formInputs = form.querySelectorAll(".form__input");
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const formButton = form.querySelector(".form__button");
  toggleButtonState(inputList, formButton);
  formInputs.forEach((formInput) => {
    if (!formInput.validity.valid) {
      showError(form, formInput, formInput.validationMessage);
    } else {
      hideError(form, formInput);
    }
  });
}

editFormElement.addEventListener("input", function () {
  checkInputValidity(editFormElement);
});
cardFormElement.addEventListener("input", function () {
  checkInputValidity(cardFormElement);
});

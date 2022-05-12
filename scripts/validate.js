function showError(form, input, errorMessage, config) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
}

function hideError(form, input, config) {
  const formError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
}
function toggleButtonState(inputList, formButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    formButton.classList.add(inactiveButtonClass);
    formButton.disabled = true;
  } else {
    formButton.classList.remove(inactiveButtonClass);
    formButton.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function checkInputValidity(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const formButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, formButton, config.inactiveButtonClass);
  inputList.forEach((formInput) => {
    if (!formInput.validity.valid) {
      showError(form, formInput, formInput.validationMessage, config);
    } else {
      hideError(form, formInput, config);
    }
  });
}

// editFormElement.addEventListener("input", function () {
//   checkInputValidity(editFormElement);
// });
// cardFormElement.addEventListener("input", function () {
//   checkInputValidity(cardFormElement);
// });
function enableValidation(config) {
  const formArray = Array.from(document.querySelectorAll(config.formSelector));
  formArray.forEach((form) => {
    form.addEventListener("input", function () {
      checkInputValidity(form, config);
    });
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});

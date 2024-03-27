const errorRequeredMessage = 'Вы пропустили это поле.';

function disableButton(submitButton, isDisabled) {
  submitButton.disabled = isDisabled;
}

const showInputError = ({formElement, inputElement, errorMessage, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}; 

const hasInvalidInput = (inputList) => inputList.some(input => !input.validity.valid);

const toggleButtonState = (inputList, buttonSubmit, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(inactiveButtonClass);
    disableButton(buttonSubmit, true);
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
    disableButton(buttonSubmit, false);
  }
}

const isValid = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if(inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(errorRequeredMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage: inputElement.validationMessage, inputErrorClass, errorClass});
  } else {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
  }
}; 

const setEventListeners = ({formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);

  formElement.addEventListener('reset', () => {
    disableButton(buttonSubmit, true);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid({formElement, inputElement, inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
    });

    
  });
};

export const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners({formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass});
  });
}

export const clearValidation = (profileForm, {inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass}) => {
  const inputs = profileForm.querySelectorAll(inputSelector);

  const buttonSubmit = profileForm.querySelector(submitButtonSelector);
  toggleButtonState([...inputs], buttonSubmit, inactiveButtonClass);
    
  [...inputs].forEach(input => {
    hideInputError({formElement:profileForm , inputElement: input, inputErrorClass, errorClass});
  });

}
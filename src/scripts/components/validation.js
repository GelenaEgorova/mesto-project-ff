// включение валидации вызовом enableValidation
const enableValidation = (validationConfig) => {
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

  // Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, validationConfig) => {
      if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  // Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(validationConfig.errorClass);    
  };

//Функция, которая проверяет наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
     disabledButton(buttonElement, validationConfig);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  }; 

// Найдём все формы с указанным классом в DOM
  const formList = document.querySelectorAll(validationConfig.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
  });
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    formError.classList.remove(validationConfig.errorClass);
    formError.textContent = '';
};

const disabledButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

// очистка ошибок валидации вызовом clearValidation
function clearValidation(formElement, validationConfig) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); 
 
  inputList.forEach(inputElement => { 
    hideInputError(formElement, inputElement, validationConfig); 
  }); 
  disabledButton(buttonElement, validationConfig);
};

export {clearValidation, enableValidation};
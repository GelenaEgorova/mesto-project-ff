// включение валидации вызовом enableValidation
const enableValidation = (element) => {
  const setEventListeners = (formElement, element) => {
    const inputList = Array.from(formElement.querySelectorAll(element.inputSelector));
    const buttonElement = formElement.querySelector(element.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, element);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, element);
      toggleButtonState(inputList, buttonElement, element);
      });
    });
  };

  // Функция, которая проверяет валидность поля
  const isValid = (formElement, inputElement, element) => {
      if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, element);
    } else {
      hideInputError(formElement, inputElement, element);
    }
  };

  // Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage, element) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(element.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(element.errorClass);    
  };

//Функция, которая проверяет наличие невалидного поля
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement, element) => {
    if (hasInvalidInput(inputList)) {
     disabledButton(buttonElement, element);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(element.inactiveButtonClass);
    }
  }; 

// Найдём все формы с указанным классом в DOM
  const formList = document.querySelectorAll(element.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, element);
  });
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, element) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(element.inputErrorClass);
    formError.classList.remove(element.errorClass);
    formError.textContent = '';
};

const disabledButton = (buttonElement, element) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(element.inactiveButtonClass);
};

// очистка ошибок валидации вызовом clearValidation
function clearValidation(formElement, element) { 
  const inputList = Array.from(formElement.querySelectorAll(element.inputSelector)); 
  const buttonElement = formElement.querySelector(element.submitButtonSelector); 
 
  inputList.forEach(inputElement => { 
    hideInputError(formElement, inputElement, element); 
  }); 
  disabledButton(buttonElement, element);
};

export {clearValidation, enableValidation};
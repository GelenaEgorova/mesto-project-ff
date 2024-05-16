function setEventListeners(popup) {
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
            close(popup);
        }
    });
}

function close(popup) {
    popup.classList.remove('popup_is-opened','popup_is-animated');
    document.removeEventListener('keydown', (evt) => handleEscape(evt,popup));
    popup.querySelector('.popup__close').removeEventListener('click', close);
}

function open(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => handleEscape(evt,popup));
    popup.querySelector('.popup__close').addEventListener('click', close);
}

function handleEscape(evt,popup) {
    if (evt.key === 'Escape') {
        close(popup);
    }
}

function getInputValues(inputValues) {
    const formValues = {};
    inputValues.forEach(input => formValues[input.name] = input.value);
    return formValues;
}

function createPopupWithImage(selector, name, link) {
    const popup = document.querySelector(selector);
    const imageScreen = popup.querySelector('.popup__image');
    const imageCaption = popup.querySelector('.popup__caption');
    popup.classList.add('popup_is-animated');
    
    imageCaption.textContent = name;
    imageScreen.src = link;
    imageScreen.alt = name;
    setEventListeners(popup);
    open(popup);
}

function createPopupWithForm({selector, handleFormSubmit, info}) {
    const popup = document.querySelector(selector);
    const form = popup.querySelector('.popup__form');
    const inputList = form.querySelectorAll('.popup__input');
    popup.classList.add('popup_is-animated');
    form.reset();
    form.addEventListener('submit', function submitForm(evt) {
        evt.preventDefault();
        handleFormSubmit(getInputValues(inputList));
        close(popup);
        form.removeEventListener('submit', submitForm);
    });
    setEventListeners(popup);
    if(info){
        inputList.forEach( input => input.value = info[input.name] );
    }
    return open(popup);
}

export { createPopupWithImage, createPopupWithForm };

function createPopup(selector) {
    const popup = document.querySelector(selector);
    popup.classList.add('popup_is-animated');
    
    function setEventListeners() {
        popup.addEventListener('mousedown', function(evt) {
            if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
                close();
            }
        });
    }

    function close() {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscape);
        popup.querySelector('.popup__close').removeEventListener('click', close);
    }

    function open() {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handleEscape);
        popup.querySelector('.popup__close').addEventListener('click', close);
    }

    function handleEscape(evt) {
        if (evt.key === 'Escape') {
            close();
        }
    }

    return {
        contains : popup,
        setEventListeners: setEventListeners,
        open: open,
        close: close
    };
}

function createPopupWithImage(selector) {
    const popup = createPopup(selector);
    const imageScreen = popup.contains.querySelector('.popup__image');
    const imageCaption = popup.contains.querySelector('.popup__caption');
    
    function open(name, link) {
        imageCaption.textContent = name;
        imageScreen.src = link;
        imageScreen.alt = name;
        popup.open();
    }


    return {
        open: open,
        close: popup.close,
        setEventListeners: popup.setEventListeners
    };
}

function createPopupWithForm({ selector, handleFormSubmit }) {
    const popup = createPopup(selector);
    const form = popup.contains.querySelector('.popup__form');
    const inputList = form.querySelectorAll('.popup__input');

    function setEventListeners() {
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
            handleFormSubmit(getInputValues());
            popup.close();
        });
        popup.setEventListeners();
    }
       
    function open(info){
        if(info){
            inputList.forEach( input => input.value = info[input.name] );
        }
        popup.open();
        setEventListeners();
    }

    function getInputValues() {
        const formValues = {};
        inputList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    return {
        open: open,
        close: popup.close,
        setEventListeners: popup.setEventListeners
    };
}

export { createPopupWithImage, createPopupWithForm };

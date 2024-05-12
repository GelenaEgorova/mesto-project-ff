function createPopup(selector) {
    const popup = document.querySelector(selector);
    function setEventListeners() {
        popup.addEventListener('mousedown', function(evt) {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                close();
            }
        });
    }

    function close() {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscape);
    }

    function open() {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handleEscape);
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
    //console.log(`popup.contains : ${popup.contains} \n imageScreen : ${imageScreen} \n imageCaption : ${imageCaption}`)

    function open(name, link) {
        imageCaption.textContent = name;
        imageScreen.src = link;
        imageScreen.alt = name;
        popup.contains.querySelector('.popup__close').addEventListener('click', close);
        popup.open();
    }

    function close(){
        popup.contains.querySelector('.popup__close').removeEventListener('click', close);
        popup.close();
    }

    return {
        open: open,
        close: popup.close,
        setEventListeners: popup.setEventListeners
    };
}

function createPopupWithConfirmation(selector, deleteCard) {
    const popup = createPopup(selector);

    function setEventListeners() {
        popup.addEventListener('submit', function(evt) {
            evt.preventDefault();
            deleteCard(card);
        });
        popup.setEventListeners();
    }

    function open(card) {
        card = card;
        popup.open();
    }

    return {
        open: open,
        close: popup.close,
        setEventListeners: setEventListeners
    };
}

function createPopupWithForm({ selector, handleFormSubmit }) {
    const popup = createPopup(selector);
    const form = popup.contains.querySelector('.popup__form');
    const inputList = form.querySelectorAll('.popup__item');
    const submitButton = popup.querySelector('.popup__save');

    function setEventListeners() {
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
            handleFormSubmit(getInputValues());
            renderLoading(true);
        });
        popup.setEventListeners();
    }

    function renderLoading(isLoading) {
        if (isLoading) {
            submitButton.textContent = 'Сохранение';
            submitButton.classList.add('loading');
        } else {
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Сохранить';
        }
    }

    function getInputValues() {
        const formValues = {};
        inputList.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    return {
        open: popup.open,
        close: popup.close,
        setEventListeners: setEventListeners
    };
}

export { createPopup, createPopupWithImage, createPopupWithConfirmation, createPopupWithForm };

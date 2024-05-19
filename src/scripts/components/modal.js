function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened')
        closeModal(openedPopup);
    }
}

export { closeModal, openModal };

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
      authorization: '704a19ce-f5b9-4f6a-ac86-79347c95ab0a',
      'Content-Type': 'application/json'
    }
  }
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject('Ошибка: ${res.status}');
}
export const getUserInfo = () => {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
     .then(handleResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
      .then(handleResponse);
};

export const editedUserInfo = ({name, about}) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
})
  .then(handleResponse);
};

export const addNewCard = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse);
}

export const deleteUserCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
}

export const likeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse);
}

export const unlikeCard = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse);
}

export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,

        })

    })
    .then(handleResponse);
}
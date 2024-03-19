const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
        Authorization: 'a6a95e55-21ca-4ece-afbe-46c54d209725',
      'Content-Type': 'application/json'
    }
}

function onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

async function fetchData(endpoint, options = {}) {
    const response = await fetch(`${config.baseUrl}/${endpoint}`, {
        method: "GET",
        headers: {
            ...config.headers,
        },
        ...options,
    });

    return await onResponse(response);
}
  
export async function getProfileUser () {
    return fetchData('users/me');
}

export async function editProfileUser (body) {
    return fetchData('users/me', {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
}

export async function editProfileAvatar (body) {
    return fetchData('users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
}

export async function getCards () {
    return fetchData('cards');
}

export async function addCard (body) {
    return fetchData('cards', {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

export async function deleteCard (cardId) {
    return fetchData(`cards/${cardId}`, {
        method: 'DELETE',
    });
}

export async function addLike (cardId) {
    return fetchData(`cards/likes/${cardId}`, {
        method: 'PUT',
    });
}

export async function deleteLike (cardId) {
    return fetchData(`cards/likes/${cardId}`, {
        method: 'DELETE',
    });
}


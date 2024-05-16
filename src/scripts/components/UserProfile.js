function createUserProfile(profileSection) {
    const userProfile =  document.querySelector(profileSection);
    const userName = userProfile.querySelector('.profile__title');
    const userDescription = userProfile.querySelector('.profile__description');
    const profileImage = userProfile.querySelector('.profile__image');

    return {
        name: userName,
        description: userDescription,
        image: profileImage
    };
}

function getUserInfo(user) {
    return { names: user.name.textContent, description: user.description.textContent};
}

function setUserInfo(user, userInfo) {
    user.name.textContent = userInfo.names;
    user.description.textContent = userInfo.description;
}

function setProfileImage(user, ProfileImage) {
    user.image.style.backgroundImage = `url('${ProfileImage}')`;
}

export {createUserProfile, getUserInfo, setUserInfo, setProfileImage}
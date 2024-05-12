export default function createUserProfile(profileSection) { //это просто наименование класса, если поменяем, то нужно будет только поменять класс в одном месте, а не везде
    const userProfile =  document.querySelector(profileSection);
    const userName = userProfile.querySelector('.profile__title');
    const userDescription = userProfile.querySelector('.profile__description');
    const profileImage = userProfile.querySelector('.profile__image');

    function getUserInfo() {
        return { title: userName.textContent, description: userDescription.textContent };
    }

    function setUserInfo(userInfo) {
        userName.textContent = userInfo.title;
        userDescription.textContent = userInfo.description;
    }

    function setProfileImage(ProfileImage) {
        profileImage.style.backgroundImage = `url(${ProfileImage})`;
    }

    return { // чтобы и спользовать функции внутри функции нужно сделать ретерн с объявлением объекта, как ниже
        getUserInfo: getUserInfo,
        setUserInfo: setUserInfo,
        setProfileImage: setProfileImage
    };
}

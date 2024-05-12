export default function createUserProfile(profileSection) {
    const userProfile =  document.querySelector(profileSection);
    const userName = userProfile.querySelector('.profile__title');
    const userDescription = userProfile.querySelector('.profile__description');
    const profileImage = userProfile.querySelector('.profile__image');

    function getUserInfo() {
        return { title: title.textContent, description: description.textContent };
    }

    function setUserInfo(userInfo) {
        userName.textContent = userInfo.title;
        userDescription.textContent = userInfo.description;
    }

    function setProfileImage(ProfileImage) {
        profileImage.style.backgroundImage = `url(${ProfileImage})`;
    }

    return {
        getUserInfo: getUserInfo,
        setUserInfo: setUserInfo,
        setProfileImage: setProfileImage
    };
}

const RootUrl = "https://conduitapi.onrender.com/api";

const articleUrl = `${RootUrl}/articles`;
const profileUrl = `${RootUrl}/profiles`;
const usersUrl = `${RootUrl}/users`;
const userVerifyUrl = `${RootUrl}/user`;
const articleLimit = 10;

const localStorageKey = "app_user";

export {
  RootUrl, articleUrl, profileUrl, usersUrl, userVerifyUrl, articleLimit, localStorageKey,
};

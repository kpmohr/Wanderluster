import userStore from '../stores/UserStore';

const loginUser = (user) => {
  userStore.loginUser(user)
}

const logoutUser = () => {
  userStore.logoutUser()
}

module.exports = {loginUser, logoutUser}

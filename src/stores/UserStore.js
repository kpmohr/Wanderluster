import Store from './Store';

class UserStore extends Store {
  constructor(initialState){
    super(null)
  }

  loginUser(user){
    this.setState(user)
  }

  logoutUser(){
    this.setState(null)
  }
}

export default new UserStore();

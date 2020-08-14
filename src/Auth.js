class Auth {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated() {
    if (localStorage.token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return this.authenticated;
  }
}

export default new Auth();

import SecureLS from "secure-ls";

const ls = new SecureLS();

const TokenService = {
  //Token functionality
  getToken() {
    return ls.get("access_token");
  },

  saveToken(token) {
    ls.set("access_token", token);
  },

  removeToken() {
    ls.remove("access_token");
  },

  //User functionality
  getUser() {
    return ls.get("user");
  },

  saveUser(user) {
    ls.set("user", user);
  },

  removeUser() {
    ls.remove("user");
  },
};

export default TokenService;

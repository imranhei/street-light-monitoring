import SecureLS from "secure-ls";

const ls = new SecureLS();

const UserService = {
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

export default UserService;
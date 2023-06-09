import SecureLS from "secure-ls";

const ls = new SecureLS();

const RoleService = {
  //User functionality
  getUserRole() {
    return ls.get("userRole");
  },

  saveUserRole(userRole) {
    ls.set("userRole", userRole);
  },

  removeUserRole() {
    ls.remove("userRole");
  },
};

export default RoleService;
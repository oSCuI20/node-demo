import User from "../../models/user";
import DefaultController from "../default";


class UserController extends DefaultController {
  constructor({username = undefined, email = undefined, password = undefined}) {
    super({model: new User()});
    
    if (username)   this.model.object.username = username;
    if (email)      this.model.object.email = email;
    if (password)   this.model.object.password = password;
  }
};

class UsersController extends UserController {
  constructor({query = {}, page = 1, limit = 10}) {
    super({});

    this.query = query;
    this.page  = page;
    this.limit = limit;
  }
};

module.exports = {
  UserController,
  UsersController
};
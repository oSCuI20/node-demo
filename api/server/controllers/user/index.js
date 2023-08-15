import User from "../../models/user";
import DefaultController from "../default";


class UserController extends DefaultController {
  constructor({username = undefined, email = undefined, values = {}}) {
    super({model: new User()});
    
    this.username = username;
    this.email    = email;

    this.query = {};
    if (this.username) this.query.username = this.username;
    if (this.email)    this.query.email    = this.email;

    this.values = values;
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
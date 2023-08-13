import User from "../../models/user";
import DefaultController from "../default";


class UserController extends DefaultController {
  constructor({username = undefined, email = undefined, password = undefined, extra = {}}) {
    super({model: new User()});
    
    this.username = username;
    this.email    = email;
    this.password = password;

    this.query = {};
    if (this.username) {
      this.query.username = this.username;
    }

    if (this.email) {
      this.query.email = this.email;
    }
  }

  async save() {
    if (this.username || this.email) {
      return await this.update();
    }

    this.model.object.username = this.username;
    this.model.object.email    = this.email;
    this.model.object.password = this.password;

    return await super.save();
  }

  async update() {
    const find = await super.select();
    this.model.object = new this.model.model(find);    
    return await super.save();
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
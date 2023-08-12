import User from "../../models/user";
import DefaultController from "../default";


export default class UserController extends DefaultController {
  constructor({username = undefined, email = undefined, password = undefined}) {
    super({model: new User()});
    
    if (username)   this.model.model.username = username;
    if (email)      this.model.model.email = email;
    if (password)   this.model.model.password = password;
  }
}
import { Types } from "mongoose";


export default class DefaultController {
  constructor({model: model}) {
    this.model = model;
    this._types = Types;
  }

  async select() {
    return await this.model.select(this.query);
  }

  async save(body) {
    return await this.model.save(body);
  }
};
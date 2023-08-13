import { Types } from "mongoose";


export default class DefaultController {
  constructor({model: model}) {
    this.model  = model;
    this._types = Types;

    if (typeof this.page  === 'undefined')  this.page = 0;
    if (typeof this.limit === 'undefined')  this.limit = 0;
  }

  async select() {
    return await this.model.select(this.query);
  }

  async find() {
    return await this.model.find({
      query: this.query, 
      page : this.page, 
      limit: this.limit
    });
  }

  async save() {
    return await this.model.save();
  }
};
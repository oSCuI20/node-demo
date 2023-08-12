

export default class DefaultModel {
  constructor({model = undefined}) { 
    this.model = model;
  }
  
  async select(query) {
    return await this.model.collection.findOne(query);
  }

  selectMany() {
    throw 'selectMany method not defined';
  }

  async save() {
    return await this.model.save();
  }

  update() {
    throw 'update method not defined';
  }

  delete() {
    throw 'delete method not defined';
  }
};
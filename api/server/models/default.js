

export default class DefaultModel {
  constructor({model = undefined}) { 
    this.object = new model();
    this.model  = model;
    console.log(this);
  }
  
  async select(query) {
    return await this.model.findOne(query);
  }

  async find({query = {}, page = 1, limit = 10}) {
    return await this.model.find(query)
                           .limit(limit * 1)
                           .skip((page - 1) * limit)
                           .exec();
  }

  async save() {
    return await this.object.save();
  }

  update() {
    throw 'update method not defined';
  }

  delete() {
    throw 'delete method not defined';
  }
};


export default class DefaultModel {
  constructor({model = undefined}) { 
    this.object = new model({username: 'testing'});
    this.model  = model;
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

  async update(condition, values) {
    return await this.model.updateOne(condition, values);
  }

  delete() {
    throw 'delete method not defined';
  }
};
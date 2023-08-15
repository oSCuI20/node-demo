import db, { Schema } from 'mongoose';

import DefaultModel   from '../default';


const userModel = db.model('users', 
  new Schema(
    {
      username: {type: String, unique: true, index: true, required: true, dropDups: true},
      email   : {type: String, unique: true, index: true, required: true, lowercase: true},
      password: {type: String, required: true},
      name    : {type: String, required: false},
      
      is_active: {type: Boolean, default: true},
      is_delete: {type: Boolean, default: false},
      is_signed: {type: Boolean, default: false},
      is_admin : {type: Boolean, default: false},

      created_at: {type: Date, default: new Date()},
      updated_at: {type: Date, default: new Date()},
    },
    {
      strict: false,
      collection: 'users'
    }
  )
  // hooks for creation users
  .pre('save', function (next) {
    let now = new Date();
    this.updated_at = now;

    if (!this.created_at) this.created_at = now;

    if (this.password) {
      // TODO password hashed
    }
    
    next();
  })
  .post('save', function (error, doc, next) {
    if (typeof error === 'object' && error.name !== 'MongoError') return next();
  
    next(error);
  })
  .pre('updateOne', async function (next) {
    const user = await this.findOne(this.getFilter());
    const update_values = this.getUpdate();
    
    Object.entries(update_values).forEach(([key, value]) => {
      if (user[key] !== value) this.set({updated_at: new Date()});
    });

    next();
  })
);

export default class User extends DefaultModel {
  constructor() {
    super({model: userModel});
  }
};

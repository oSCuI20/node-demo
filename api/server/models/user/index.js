import db, { Schema } from 'mongoose';
import DefaultModel        from '../default';


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

      created_at: {type: Date, index: true,  default: Date.now},
      updated_at: {type: Date, index: true, default: Date.now},
    },
    {
      strict: true,
      collection: 'users',
    }
  )
  // hooks for creation users
  .pre('save', function (next) {
    let current_date = new Date();
    this.updated_at = current_date;

    if (!this.created_at) {
      this.created_at = current_date;
    }

    if (this.password) {
      // TODO password hashed
    }
    
    next();
  })
  .post('save', function (error, doc, next) {
    if (typeof error === 'object' && error.name !== 'MongoError') {
      return next();
    }
  
    next(error);
  })
  .pre('updateOne', function (next) {
    let current_date = new Date();
    this.updated_at = current_date;

    next();
  })
);

export default class User extends DefaultModel {
  constructor() {
    super({model: userModel});
  }
};

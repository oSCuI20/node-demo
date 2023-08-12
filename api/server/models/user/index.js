import db, { Schema } from 'mongoose';
import DefaultModel        from '../default';


const userModel = db.model('users', 
  new Schema(
    {
      username: {type: String, unique: true, required: true, dropDups: true},
      email   : {type: String, unique: true, required: true, lowercase: true},
      password: {type: String, required: true},
      name    : {type: String, required: false},
      
      is_active: {type: Boolean, default: true},
      is_delete: {type: Boolean, default: false},
      is_signed: {type: Boolean, default: false},
      is_admin : {type: Boolean, default: false},

      created_at: {type: Date, default: Date.now},
      updated_at: {type: Date, default: Date.now},
    },
    {
      strict: true,
      collection: 'users',
    }
  )
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
    if (error.name !== 'MongoError') {
      return next();
    }
  
    next(error);
  })
);

export default class User extends DefaultModel {
  constructor() {
    super({model: new userModel});
  }
};

// const _schema = new Schema(
//   {
//     username: {type: String, unique: true, required: true, dropDups: true},
//     email   : {type: String, unique: true, required: true, lowercase: true},
//     password: {type: String, required: true},
//     name    : {type: String, required: false},
    
//     is_active: {type: Boolean, default: true},
//     is_delete: {type: Boolean, default: false},
//     is_signed: {type: Boolean, default: false},
//     is_admin : {type: Boolean, default: false},

//     created_at: {type: Date, default: Date.now},
//     updated_at: {type: Date, default: Date.now},
//   },
//   {
//     strict: true,
//     collection: 'users',
//   }
// );

// _schema.pre('save', function (next) {
//   let current_date = new Date();
//   this.updated_at = current_date;

//   if (!this.created_at) {
//     this.created_at = current_date;
//   }

//   if (this.password) {
//     // TODO password hashed
//   }
  
//   next();
// });

// _schema.post('save', function (error, doc, next) {
//   if (error.name !== 'MongoError') {
//     return next();
//   }

//   next(error);
// });

// const userModel = db.model('users', _schema);

// export default class User extends DefaultModel {
//   constructor() {
//     super({model: new userModel});
//   }
// };
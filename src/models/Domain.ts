// import mongoose, { Document } from 'mongoose';
// import BadRequestError from '../errors/BadRequestError';

// export interface DomainInfo {
//   name: string;
//   lastScanned?: Date;
// }

// export interface DomainDoc extends Document, DomainInfo {
// }

// interface DomainModel extends mongoose.Model<DomainDoc> {}

// const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/;

// const domainSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     validate: {
//       validator: function(v: string) {
//         return domainPattern.test(v);
//       },
//       message: (props: any) => `${props.value} is not a valid domain name!`
//     }
//   },
//   lastScanned: Date
// });

// domainSchema.pre('save', function (next) {
//   const domain = this as DomainDoc;
//   if (!domainPattern.test(domain.name)) {
//     return next(new BadRequestError({ code: 400, message: `${domain.name} is not a valid domain name!` }));
//   }
//   next();
// });

// domainSchema.index({ name: 1 }); 

// const Domain = mongoose.model<DomainDoc, DomainModel>('Domains', domainSchema);

// export default Domain;

import mongoose, { Document } from 'mongoose';
import BadRequestError from '../errors/BadRequestError'; 

export interface DomainInfo {
  name: string;
  lastScanned?: Date;
}

export interface DomainDoc extends Document, DomainInfo {}

interface DomainModel extends mongoose.Model<DomainDoc> {}

// Common regex pattern for domain name validation
const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/;

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: string) {
        return domainPattern.test(v);
      },
      message: (props: any) => `${props.value} is not a valid domain name!`
    }
  },
  lastScanned: Date
});


domainSchema.index({ name: 1 });

const Domain = mongoose.model<DomainDoc, DomainModel>('Domains', domainSchema);

export default Domain;


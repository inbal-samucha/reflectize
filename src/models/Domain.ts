import mongoose, { Document } from 'mongoose';

export interface DomainInfo {
  name: string;
  status: 'pending' | 'completed' | 'failed';
  lastScanned?: Date;
}

export interface DomainDoc extends Document, DomainInfo {
}

interface DomainModel extends mongoose.Model<DomainDoc> {}

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z0-9\-\.]+$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid domain name!`
    }
  },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  lastScanned: Date
});

domainSchema.index({ name: 1 }); 
domainSchema.index({ status: 1 }); 

const Domain = mongoose.model<DomainDoc, DomainModel>('Domains', domainSchema);

export default Domain;

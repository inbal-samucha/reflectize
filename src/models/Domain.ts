// import mongoose, { Document } from 'mongoose';

// export interface DomainInfo {
//   name: string;
//   virustotalInfo?: VirusTotalInfo;
//   whoisInfo?: WhoisInfo;
//   status:  'pending' | 'completed' | 'failed';
//   lastScanned?: Date
// }

// export interface VirusTotalInfo {
//   [key: string]: any; 
// }

// export interface WhoisInfo {
//   [key: string]: any; 
// }


// interface DomainDocument extends DomainInfo, Document {}

// const domainSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
//   virustotalInfo: Object,
//   whoisInfo: Object,
//   lastScanned: Date
// });

// const Domain = mongoose.model<DomainDocument>('domains', domainSchema);
// export default Domain;

import mongoose, { Document } from 'mongoose';

export interface DomainInfo {
  name: string;
  virustotalInfo?: VirusTotalInfo;
  whoisInfo?: WhoisInfo;
  status:  'pending' | 'completed' | 'failed';
  lastScanned?: Date
}

export interface VirusTotalInfo {
  [key: string]: any; 
}

export interface WhoisInfo {
  [key: string]: any; 
}

export interface DomainDoc extends Document{
  name: string;
  virustotalInfo?: VirusTotalInfo;
  whoisInfo?: WhoisInfo;
  status:  'pending' | 'completed' | 'failed';
  lastScanned?: Date
}

interface DomainModel extends mongoose.Model<DomainDoc>{}

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  virustotalInfo: Object,
  whoisInfo: Object,
  lastScanned: Date
});

const Domain = mongoose.model<DomainDoc, DomainModel>('domains', domainSchema);

export default Domain;
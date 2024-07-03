import mongoose, { Document } from 'mongoose';

export interface ScanResultInfo {
  domain: string;
  provider: string;
  result: any; 
  scannedAt: Date;
}

export interface ScanResultDoc extends Document, ScanResultInfo {
}

interface ScanResultModel extends mongoose.Model<ScanResultDoc> {}

const scanResultSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  provider: { type: String, required: true },
  result: { type: mongoose.Schema.Types.Mixed },
  scannedAt: { type: Date, default: Date.now }
});

scanResultSchema.index({ domain: 1 }); 
scanResultSchema.index({ provider: 1 }); 

const ScanResult = mongoose.model<ScanResultDoc, ScanResultModel>('ScanResult', scanResultSchema);

export default ScanResult;

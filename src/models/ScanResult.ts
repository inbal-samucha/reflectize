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

const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}$/;

const scanResultSchema = new mongoose.Schema({
  domain: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return domainPattern.test(v);
      },
      message: (props: any) => `${props.value} is not a valid domain name!`
    }
  },
  provider: { type: String, required: true },
  result: { type: mongoose.Schema.Types.Mixed },
  scannedAt: { type: Date, default: Date.now }
});

scanResultSchema.index({ domain: 1 }); 
scanResultSchema.index({ provider: 1 }); 

const ScanResult = mongoose.model<ScanResultDoc, ScanResultModel>('ScanResult', scanResultSchema);

export default ScanResult;

import cron from 'node-cron';
import { getWhoisInfo } from './whoisService';
import { getVirusTotalInfo } from './virusTotslService';
import Domain, { DomainDoc } from '../models/Domain';
import BadRequestError from '../errors/BadRequestError';
import ScanResult from '../models/scanResult';

export const scheduleCronJobs = () => { 
  cron.schedule('0 0 1 * *', async () => {
    try{

      const domainsToAnalyze: DomainDoc[] = await Domain.find({});
    
        for(const domain of domainsToAnalyze){
          const recentScan = await ScanResult.findOne({
            domain: domain.name,
            scannedAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
          });

          if (!recentScan) {
            const virusTotalInfo = await getVirusTotalInfo(domain.name); 
            const whoisInfo = await getWhoisInfo(domain.name);
  
            const virusTotalResult = new ScanResult({
              domain: domain.name,
              provider: 'VirusTotal',
              result: virusTotalInfo,
              scannedAt: new Date()
            });
            await virusTotalResult.save();

            const whoisResult = new ScanResult({
              domain: domain.name,
              provider: 'WHOIS',
              result: whoisInfo,
              scannedAt: new Date()
            });
            await whoisResult.save();
            domain.status = 'completed';
            domain.lastScanned = new Date()
            await domain.save();
          }
        }

    } catch (err) {
      console.log(err);
      throw new BadRequestError({code: 400, message: 'Something went worng with cron job', logging: true});
    }
  })
}


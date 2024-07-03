import cron from 'node-cron';
import { getWhoisInfo } from './whoisService';
import { getVirusTotalInfo } from './virusTotslService';
import Domain, { VirusTotalInfo, WhoisInfo } from '../models/Domain';
import BadRequestError from '../errors/BadRequestError';

export const scheduleCronJobs = () => { 
  cron.schedule('0 0 1 * *', async () => {
    try{

      const domainsToAnalyze = await Domain.find({ status : 'pending'});
      if(domainsToAnalyze){

        for(const domain of domainsToAnalyze){
          const virustotalInfo: VirusTotalInfo = await getVirusTotalInfo(domain.name); 
          const whoisData: WhoisInfo = await getWhoisInfo(domain.name);

          domain.virustotalInfo = virustotalInfo;
          domain.whoisInfo = whoisData;
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

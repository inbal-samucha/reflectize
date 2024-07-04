import ServerError from '../errors/ServerError';
import express, { Request, Response } from 'express';
import Domain, { DomainDoc } from '../models/Domain';
import ScanResult from '../models/ScanResult';

const domainRoutes = express.Router();

domainRoutes.get('/domain/:domain', async (req: Request, res: Response) => {
  const { domain }  = req.params;
  try {
    const domainInfo: DomainDoc | null = await Domain.findOne( { name: domain });

    if(!domainInfo){

      const newDomain: DomainDoc = new Domain({ name: domain });
      await newDomain.save();
      return res.status(202).send({ message: 'Domain added for analysis, check back later.' });
    }

    const recentScan = await ScanResult.find({
      domain: domain,
      scannedAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
    });

    console.log(recentScan);
    
    if (recentScan.length === 0) {
      return res.status(202).send({ message: 'Domain is being analyzed, check back later.' });
    }


    res.send(recentScan);

  } catch (err){
    throw new ServerError({code: 500, message: 'Internal Server Error', logging: true});
  }

});

domainRoutes.post('/domain', async (req: Request, res: Response) => {
  const { domain } = req.body;
  try {

    const domainExist:  DomainDoc | null = await Domain.findOne({ name: domain });

    if (!domainExist) {
      const newDomain:  DomainDoc = await new Domain({ name: domain });
      await newDomain.save();
    }

    res.status(202).send('Domain added for analysis.');
  } catch (err){
    throw new ServerError({code: 500, message: 'Internal Server Error', logging: true});
  }
});



export { domainRoutes }

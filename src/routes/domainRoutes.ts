import ServerError from '../errors/ServerError';
import express, { Request, Response } from 'express';
import Domain, { DomainDoc } from '../models/Domain';

const domainRoutes = express.Router();

domainRoutes.get('/domain/:domain', async (req: Request, res: Response) => {
  const { domain }  = req.params;
  try {
    const domainInfo: DomainDoc | null = await Domain.findOne( { name: domain });

    if(!domainInfo || domainInfo.status === 'pending'){
      await Domain.updateOne({ name: domain }, { $set: { name: domain, status: 'pending' } }, { upsert: true });

      return res.status(202).send({ message: 'Domain added for analysis, check back later.' });
    }


    res.send(domainInfo);

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

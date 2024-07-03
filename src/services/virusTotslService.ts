import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import { VirusTotalInfo } from "../models/Domain";
import BadRequestError from "../errors/BadRequestError";

async function getVirusTotalInfo (domain: string): Promise<VirusTotalInfo> {
  try {
    const response = await axios.get(`${process.env.VIRUSTOTAL_API_URL}/${domain}`, {
      headers: {
        'x-apikey': process.env.VIRUS_TOTAL_API_KEY
      }
    });

    return response.data;
  } catch (err){
    throw new BadRequestError({code: 400, message: 'Error fetching VirusTotal data:', logging: true});
  }
}

export { getVirusTotalInfo }
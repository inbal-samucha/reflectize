import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";

import BadRequestError from '../errors/BadRequestError';

async function getWhoisInfo(domain: string) {
    try {
        const response = await axios.get(`${process.env.WHOIS_API_URL}`, {
            params: {
                apiKey: process.env.WHOISXML_API_KEY,
                domainName: domain,
                outputFormat: 'JSON'
            }
        });
        return response.data;
    } catch (error) {
      throw new BadRequestError({code: 400, message: 'Error fetching WHOIS data:', logging: true});
    }
}

export { getWhoisInfo }
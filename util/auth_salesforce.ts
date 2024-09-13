import axios from 'axios';
import * as cache from "memory-cache";

export const get_salesforce_token = async () => {
  await ensure_token_valid()
  return cache.get('salesforce_access_token');
}

const ensure_token_valid = async() => {
  const tokenExpiry = await get_token_expiry();
  if (!tokenExpiry || new Date().getTime() > tokenExpiry) {
      await fetch_new_access_token();
  }
}

const fetch_new_access_token = async() => {
  const salesforce_instance_url = process.env.SALESFORCE_INSTANCE;
  const client_key = process.env.SALESFORCE_CLIENT_KEY;
  const secret_key = process.env.SALESFORCE_SECRET_KEY;

  const salesforceApiUrl = `https://${salesforce_instance_url}/services/oauth2/token`;

  try {
    console.log("Fetching new access token...");
    const response = await axios.get(salesforceApiUrl, {
      headers: {
        host: "pe-demo-sdo.my.salesforce.com"
      },
      params: {
        grant_type: 'client_credentials',
        client_id: client_key,
        client_secret: secret_key
      }
    });

    set_token(response.data.access_token);
  } catch (error) {
    // Log the request that was made
    if (error.config) {
      console.error('Request Config:');
      console.error('URL:', error.config.url);
      console.error('Method:', error.config.method);
      console.error('Headers:', JSON.stringify(error.config.headers, null, 2));
      if (error.config.data) {
          console.error('Data:', JSON.stringify(JSON.parse(error.config.data), null, 2));
      }
  }
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Salesforce API error: ${JSON.stringify(error.response.data)}`);
    } else {
      throw new Error(`Unexpected error fetching Salesforce API Token: ${error.message}`);
    }
  }
}

const set_token = (token) => {
  const expiresIn = 1800 // token expires every 30 min, 1800 seconds

  const expiryTime = new Date().getTime() + expiresIn * 1000;
  cache.put('salesforce_access_token', token);
  cache.put('salesforce_token_expiry', expiryTime);
}

const get_token_expiry = () => {
  return cache.get('salesforce_token_expiry');
}
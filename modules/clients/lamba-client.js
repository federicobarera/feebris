import axios from 'axios';
import axios_retry from 'axios-retry'
import config from '../../configuration/all';

const client = axios.create({
    baseURL: config.lamba_url,
    headers: {
        'x-api-key': config.gateway_key
    }
});
axios_retry(client, { retries: 3, retryDelay: axios_retry.exponentialDelay })

export default client;
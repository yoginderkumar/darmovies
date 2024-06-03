import axios from 'axios';
import { config } from '../config';

const API_KEY = config.apiKey;
const BASE_URL = config.baseUrl;
const VERSION = '3';

const apiClient = axios.create({
  baseURL: `${BASE_URL}/${VERSION}`,
  params: {
    api_key: API_KEY,
  },
});

export default apiClient;

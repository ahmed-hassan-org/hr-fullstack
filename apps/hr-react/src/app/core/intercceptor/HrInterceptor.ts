import axios from 'axios';
import { baseUrl } from '../config/AppConfig';
import { LocalStorageKeysReact } from '../models/enum/LocalStorgeKeysReact.enum';

const API_URL = baseUrl;

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem(LocalStorageKeysReact.APP_TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

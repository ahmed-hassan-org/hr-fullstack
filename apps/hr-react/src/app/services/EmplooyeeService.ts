import axios from 'axios';
import { baseUrl } from '../core/config/AppConfig';
import { useQuery } from 'react-query';

const getAllEmployees = () => {
  return axios.get(`${baseUrl}/employees`);
};

export const useGetEmplpyees = () => {
  return useQuery('useGetEmplpyees', getAllEmployees);
};

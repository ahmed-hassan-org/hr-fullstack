import axios from 'axios';
import { baseUrl } from '../core/config/AppConfig';
import { useQuery } from 'react-query';

const getAllDepartmens = () => {
  return axios.get(`${baseUrl}/departments`);
};

export const useGetDepartmens = () => {
  return useQuery('useGetDepartmens', getAllDepartmens);
};

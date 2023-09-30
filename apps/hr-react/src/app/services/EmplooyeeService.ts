import axios from 'axios';
import { baseUrl } from '../core/config/AppConfig';
import { useQuery } from 'react-query';

export const getAllEmployees = () => {
  return axios.get(`${baseUrl}/employees`);
};

export const useGetEmplpyees = () => {
  return useQuery('useGetEmplpyees', getAllEmployees);
};

const getOneEmployee = (empId: number) => {
  return axios.get(`${baseUrl}/employees/${empId}`);
};

export const useGetOneEmplpyee = (empId: number) => {
  return useQuery('useGetOneEmplpyee', () => getOneEmployee(empId));
};

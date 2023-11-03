import axios from 'axios';
import { baseUrl } from '../core/config/AppConfig';
import { useQuery } from 'react-query';

export const getAllEmployees = (take = 1, skip = 5) => {
  return axios.get(`${baseUrl}/employees?take=${take}&skip=${skip}`);
};

export const useGetEmplpyees = (take = 1, skip = 5) => {
  return useQuery('useGetEmplpyees', () => getAllEmployees(take, skip), {});
};

const getOneEmployee = (empId: number) => {
  return axios.get(`${baseUrl}/employees/${empId}`);
};

export const useGetOneEmplpyee = (empId: number) => {
  return useQuery('useGetOneEmplpyee', () => getOneEmployee(empId));
};

/* eslint-disable react-hooks/rules-of-hooks */
import { atom, selector, selectorFamily } from 'recoil';
import {
  getAllEmployees,
  useGetEmplpyees,
  useGetOneEmplpyee,
} from '../services/EmplooyeeService';

export const getAllEmployeesSelector = selector({
  key: 'getAllEmployeesSelector',
  get: async () => {
    const { data } = await getAllEmployees();

    return data?.data;
  },
});

export const useEmployeeState = atom({
  key: 'useEmployeeState',
  default: getAllEmployeesSelector,
});

const useEmployeeSelector = selector({
  key: 'useEmployeeSelector',
  get: ({ get }) => get(useEmployeeState),
  set: ({ set }, newValue) => set(useEmployeeState, newValue),
});

export const useSearchEmployeeSelector = selectorFamily({
  key: 'useSearchEmployeeSelector',
  get:
    (empId: number) =>
    async ({ get }) => {
      const { data, error } = await useGetOneEmplpyee(empId);
      if (error) {
        throw error;
      }
      return data?.data.data;
    },
});

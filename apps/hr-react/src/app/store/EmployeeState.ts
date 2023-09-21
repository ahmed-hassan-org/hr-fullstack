import { atom, selector } from 'recoil';

export const useEmployeeState = atom({
  key: 'useEmployeeState',
  default: {
    employeesList: [],
    employee: {},
  },
});

const useEmployeeSelector = selector({
  key: 'useEmployeeSelector',
  get: ({ get }) => get(useEmployeeState),
  set: ({ set }, newValue) => set(useEmployeeState, newValue),
});

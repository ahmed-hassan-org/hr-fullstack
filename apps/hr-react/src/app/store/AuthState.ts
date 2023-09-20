import { atom, selector } from 'recoil';
import { LocalStorageKeysReact } from '../core/models/enum/LocalStorgeKeysReact.enum';

export const useAuthState = atom({
  key: 'useAuthState',
  default: {
    token: '',
    isLoggedIn:
      Boolean(
        sessionStorage.getItem(LocalStorageKeysReact.APP_IS_LOGGEDIN)
      ).valueOf() ?? false,
    roles: '',
  },
});

export const useAuthSelector = selector({
  key: 'useAuthSelector',
  get: ({ get }) => get(useAuthState),
  set: ({ set }, newValue) => set(useAuthState, newValue),
});

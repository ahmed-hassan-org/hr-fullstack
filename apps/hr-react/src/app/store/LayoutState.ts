import { atom } from 'recoil';

export const useLayoutState = atom({
  key: 'useLayoutState',
  default: {
    /** the placement of the drawer left or right */
    drawerAnchor: 'left',
    /** state for drawer */
    draweOpen: false,
  },
});

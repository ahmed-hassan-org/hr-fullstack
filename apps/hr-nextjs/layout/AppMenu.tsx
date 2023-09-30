/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
      label: 'Hr Module',
      items: [
        {
          label: 'Employees',
          icon: 'pi pi-fw pi-home',
          to: '/pages/employees',
        },
        {
          label: 'Departments',
          icon: 'pi pi-fw pi-home',
          to: '/pages/departments',
        },
      ],
    },

    {
      label: 'Pages',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        {
          label: 'Auth',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Login',
              icon: 'pi pi-fw pi-sign-in',
              to: '/auth/login',
            },
            {
              label: 'Error',
              icon: 'pi pi-fw pi-times-circle',
              to: '/auth/error',
            },
            {
              label: 'Access Denied',
              icon: 'pi pi-fw pi-lock',
              to: '/auth/access',
            },
          ],
        },
        {
          label: 'Not Found',
          icon: 'pi pi-fw pi-exclamation-circle',
          to: '/pages/notfound',
        },
      ],
    },
    // {
    //   label: 'Hierarchy',
    //   items: [
    //     {
    //       label: 'Submenu 1',
    //       icon: 'pi pi-fw pi-bookmark',
    //       items: [
    //         {
    //           label: 'Submenu 1.1',
    //           icon: 'pi pi-fw pi-bookmark',
    //           items: [
    //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
    //           ],
    //         },
    //         {
    //           label: 'Submenu 1.2',
    //           icon: 'pi pi-fw pi-bookmark',
    //           items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
    //         },
    //       ],
    //     },
    //     {
    //       label: 'Submenu 2',
    //       icon: 'pi pi-fw pi-bookmark',
    //       items: [
    //         {
    //           label: 'Submenu 2.1',
    //           icon: 'pi pi-fw pi-bookmark',
    //           items: [
    //             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
    //           ],
    //         },
    //         {
    //           label: 'Submenu 2.2',
    //           icon: 'pi pi-fw pi-bookmark',
    //           items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}

        {/* <Link
          href="https://blocks.primereact.org"
          target="_blank"
          style={{ cursor: 'pointer' }}
        >
          <img
            alt="Prime Blocks"
            className="w-full mt-3"
            src={`/layout/images/banner-primeblocks${
              layoutConfig.colorScheme === 'light' ? '' : '-dark'
            }.png`}
          />
        </Link> */}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;

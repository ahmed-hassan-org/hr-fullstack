import {
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  colors,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLayoutState } from '../../../store/LayoutState';
import { Link, useNavigation } from 'react-router-dom';

const SidebarDrawer = () => {
  const [layoutState, setLayoutState] = useRecoilState(useLayoutState);
  // const router = useNavigation();
  const [drawerLinks, setDrawerLinks] = useState([
    {
      id: 1,
      label: 'Dashboard',
      url: '/',
      isDivider: false,
    },
    {
      id: 2,
      label: '',
      url: '',
      isDivider: true,
    },
    {
      id: 3,
      label: 'Employees',
      url: '/hr/employees',
      isDivider: false,
    },
    {
      id: 4,
      label: 'Departments',
      url: '/hr/departments',
      isDivider: false,
    },
    {
      id: 5,
      label: 'Locations',
      url: '/hr/locations',
      isDivider: false,
    },
  ]);
  return (
    <Drawer
      anchor={layoutState.drawerAnchor === 'left' ? 'left' : 'right'}
      open={layoutState.draweOpen}
      onClose={() => setLayoutState((e) => ({ ...e, draweOpen: false }))}
      PaperProps={{
        sx: { width: '300px', px: '5px', pt: '10px', pb: '5px' },
      }}
    >
      <Typography variant="body1" fontWeight="bold" textAlign={'center'}>
        Hr Applications
      </Typography>
      <Divider variant="middle" orientation="horizontal" />

      {drawerLinks &&
        drawerLinks.map((item) =>
          item.isDivider ? (
            <Divider
              key={item.id}
              orientation="horizontal"
              sx={{
                border: 1,
                width: '100%',
              }}
            />
          ) : (
            <ListItem disablePadding key={item.id}>
              <ListItemButton>
                <Link to={item.url} style={{ textDecoration: 'none' }}>
                  <ListItemText primary={item.label} />
                </Link>
              </ListItemButton>
            </ListItem>
          )
        )}
      <Divider />
      <Typography variant="subtitle1" color={colors.deepOrange['600']}>
        Reports
      </Typography>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          {/* <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon> */}
          <ListItemText primary={'Payslip'} />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};

export default SidebarDrawer;

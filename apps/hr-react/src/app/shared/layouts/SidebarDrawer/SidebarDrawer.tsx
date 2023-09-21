import {
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  colors,
} from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useLayoutState } from '../../../store/LayoutState';

const SidebarDrawer = () => {
  const [layoutState, setLayoutState] = useRecoilState(useLayoutState);

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
      <ListItem disablePadding>
        <ListItemButton>
          {/* <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon> */}
          <ListItemText primary={'Employees'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          {/* <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon> */}
          <ListItemText primary={'Departments'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          {/* <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon> */}
          <ListItemText primary={'Locations'} />
        </ListItemButton>
      </ListItem>
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

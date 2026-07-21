import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Academy', path: '/academy', icon: <SchoolIcon /> },
    { label: 'Apprenticeship', path: '/apprenticeship', icon: <AssignmentIcon /> },
    { label: 'Documents', path: '/documents', icon: <FolderIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  const currentValue = navItems.findIndex(item => item.path === location.pathname);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.secondary.main,
        borderTop: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <BottomNavigation
        showLabels
        value={currentValue >= 0 ? currentValue : 0}
        onChange={(event, newValue) => {
          navigate(navItems[newValue].path);
        }}
        sx={{
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: '#FFFFFF',
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        {navItems.map(item => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}

export default NavigationBar;

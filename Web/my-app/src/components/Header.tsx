import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, useTheme, Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { IStudents } from '../common/IStudents';
import { ITeachers } from '../common/ITeachers';
import { clearStudent } from '../redux/studentsSlice';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#E3F2FD', // Light blue background
  boxShadow: theme.shadows[3],
}));

const LogoContainer = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#0D47A1', // Dark blue text
  fontWeight: 'bold',
  textTransform: 'none',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(13, 71, 161, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));



const MenuContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#0D47A1',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Header: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const studentData = useSelector((state: RootState) => state.students.studentsData) as IStudents | null;
  const teacherData = useSelector((state: RootState) => state.teachers.teachersData) as ITeachers | null;
  console.log("student",studentData,teacherData)
  const handleLogOut =() =>{
    console.log("I am in inside logout")
    dispatch(clearStudent())
  }
  const menuItems = [
    { text: 'Home', onClick: () => navigate('/') },
    { text: 'About', onClick: () => navigate('/about') },
    { text: 'Contact', onClick: () => navigate('/contact') },
    { text: 'Admin', onClick: () => navigate('/admin-panel') },
    studentData || teacherData
      ? { text: 'Log Out', onClick: () => handleLogOut() }
      : { text: 'Login', onClick: () => navigate('/login') },
  ];
  

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          <LogoContainer onClick={() => navigate('/')}> 
            <Avatar alt="Logo" src="/logo.png" />
          </LogoContainer>
          
          <NavButton onClick={() => navigate('/')}>Home</NavButton>
          <NavButton onClick={() => navigate('/about')}>About</NavButton>
          {
            studentData || teacherData ? <NavButton onClick={() => handleLogOut()}>Log Out</NavButton> :<NavButton onClick={() => navigate('/login')}>Login</NavButton> 
          }
          
          <NavButton onClick={() => navigate('/contact')}>Contact</NavButton>
          <NavButton onClick={() => navigate('/admin-panel')}>Admin</NavButton>          
          
          <WelcomeText>Welcome to Online Coaching</WelcomeText>
          
          <MenuContainer>
            <IconButton color="primary" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </MenuContainer>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => { item.onClick(); toggleDrawer(false)(); }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;

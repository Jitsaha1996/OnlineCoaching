import React, { useEffect } from 'react'
import { IStudents } from '../common/IStudents';
import { ITeachers } from '../common/ITeachers';
import { getFromLocalStorage } from '../redux/localStorage';
type IUser = IStudents | ITeachers;
import { Box, styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));


const StudentDetails: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData: IUser | null = getFromLocalStorage('userData');

      if (storedUserData) {
          try {
              setLoading(true);
              const response = await fetch(``, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });

              if (!response.ok) throw new Error('Failed to fetch user data');
              const userData = await response.json();
              if (userData) {
                  dispatch(setUser(userData));
                  
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
          finally{
              setLoading(false);
          }
      }
    }
},);

  return (
    <StyledBox>
      <Typography variant="h5">Student Details</Typography>
    </StyledBox>
  );
};

export default StudentDetails;



function setUser(userData: any): any {
  throw new Error('Function not implemented.');
}


import { Box, Typography, Card, CardActions, CardContent,Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { setStudent } from '../redux/studentsSlice';
import { RootState } from '../redux/store';
import { IStudents } from '../common/IStudents';
import Toaster from '../Utils/Toaster';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease',
  '&:hover': {
      transform: 'scale(1.02)',
  },
}));


export const Login: React.FC = () =>{
  const[userType, setuserType]=  useState('');
  const[password, setPassword]= useState('');
  const[name, setName]= useState('');
  const[email, setEmail]= useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterSeverity, setToasterSeverity] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    userType: "",
          
  });
  

  

    
  

  return(
    
    <Box className="flex flex-row bg-cyan-200  w-60 h-60 ">
        <Box className=" flex justify-center items-center w-full h-full">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            <TextField id="filled-required" label="Required"  variant="filled" />
            </Typography>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            <TextField id="filled-required" label="Required"  variant="filled" />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Submit</Button>
          </CardActions>
        </Card>      
        </Box>
      
    </Box>
    
  )
}

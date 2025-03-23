import { Box, Typography, Card, CardActions, CardContent,Button, TextField } from "@mui/material";
import React, { useState } from "react";


export const Login: React.FC = () =>{
  const[userType, setuserType]=  useState('');
  const[password, setPassword]= useState('');
  const[name, setName]= useState('');
  const[email, setEmail]= useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  

  

    
  

  return(
    <Box>
    <Box className="flex flex-row bg-cyan-200  w-screen h-screen ">
        <Box className=" flex justify-center items-center w-3xl h-72">
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
    </Box>
  )
}

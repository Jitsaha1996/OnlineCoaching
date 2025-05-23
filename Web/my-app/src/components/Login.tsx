import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    styled,
    useTheme,
    CircularProgress,
    Grid,
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Toaster from '../Utils/Toaster';
import { useDispatch, useSelector } from 'react-redux';
import { setStudent } from '../redux/studentsSlice';
import { RootState } from '../redux/store';
import { IStudents } from '../common/IStudents';
import { ITeachers } from '../common/ITeachers';
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


const Login: React.FC = () => {

    const [userType, setuserType] = useState('');
    const userTypeOptions = ["Student", "Teacher"];
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [toasterOpen, setToasterOpen] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [toasterSeverity, setToasterSeverity] = useState<'success' | 'error'>('success');
    const studentsData = useSelector((state: RootState) => state.students.studentsData) as IStudents | null;
    const [formData, setFormData] = useState<any>({
        password: "",
        //  email: "",
        phone: "",
        userType: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if (studentsData) {
            navigate("/student-details");
        }
    }, [studentsData, navigate]);

    const handleCloseToaster = () => {
        setToasterOpen(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const url =
            formData?.userType === "Student"
                ? "http://localhost:5000/api/students/login"
                : formData?.userType === "Teacher"
                    ? "http://localhost:5000/api/teachers/login"
                    : "";

        if (!url) {
            setError("Invalid user type");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userType: formData.userType,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok || data?.success === false) {
                setToasterMessage(data?.message || "Invalid phone or password");
                setToasterSeverity('error');
                setToasterOpen(true);
                throw new Error(data?.message || "Login failed");
            }

            dispatch(setStudent(data));
            setToasterMessage("Login successful!");
            setToasterSeverity('success');
            setToasterOpen(true);

            if (formData?.userType === "Student") {
                navigate("/student-details");
            } else if (formData?.userType === "Teacher") {
                navigate("/teacher-details");
            }

            setTimeout(() => {
                setLoading(false);
                navigate('/home');
            }, 1500);

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };


    const handleForgetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const url = formData?.userType === "Student"
                ? "http://localhost:5000/api/students/forgetPassword"
                : formData?.userType === "Teacher"
                    ? "http://localhost:5000/api/teachers/forgetPassword"
                    : "";


            if (!url) {
                setError("Invalid user type");
                setLoading(false);
                return;
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userType: formData.userType, phone: formData.phone, newPassword: formData.newPassword }),
            });


            if (!response.ok) {
                setToasterMessage("Error updating password");
                setToasterSeverity('error');
                setToasterOpen(true);
                throw new Error('Error updating password');
            }

            setToasterMessage("Password changed successfully!");
            setToasterSeverity('success');
            setToasterOpen(true);

            setTimeout(() => {
                setIsForgetPassword(false);
                setLoading(false);
                navigate('/login'); // Redirect to login page
            }, 1500);


        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };
    const handleChangeSelect = (e: any) => {
        console.log("input element", e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleChange = (e: any, index?: number) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    return (
        <StyledBox>
            <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
                <Card elevation={6} sx={{ padding: 4, borderRadius: 2, position: 'relative' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            opacity: 0.1,
                            zIndex: 0,
                            borderRadius: 2,
                        }}
                    />
                    <Typography variant="h5" component="h1" textAlign="center">
                        {isForgetPassword ? 'Reset Password' : 'Login'}
                    </Typography>
                    {error && (
                        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={isForgetPassword ? handleForgetPassword : handleLogin} sx={{ mt: 2 }}>
                        {isForgetPassword ? (
                            <>
                                <TextField
                                    label="Phone Number"
                                    name='phone'
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                />
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                />
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">UserType</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="userType"
                                        value={formData.userType}
                                        label="UserType *"
                                        onChange={handleChangeSelect}
                                    >
                                        {userTypeOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>

                                <TextField
                                    label="Phone Number"
                                    name='phone'
                                    fullWidth
                                    margin="normal"

                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    name='password'
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                />
                            </>
                        )}
                        <CardActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.main,
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : (isForgetPassword ? 'Reset Password' : 'Login')}
                            </Button>

                        </CardActions>
                    </Box>
                    <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Grid item>
                            {isForgetPassword ? (
                                <Typography variant="body2">
                                    Remembered your password?{' '}
                                    <Button onClick={() => setIsForgetPassword(false)} color="primary">
                                        Login
                                    </Button>
                                </Typography>
                            ) : (
                                <>
                                    <Typography variant="body2">
                                        Forgot your password?{' '}
                                        <Button onClick={() => setIsForgetPassword(true)} color="primary">
                                            Reset
                                        </Button>
                                    </Typography>
                                    <Typography variant="body2">
                                        Don't have an account?{' '}
                                        <Button onClick={() => navigate('/register')} color="primary">
                                            Register
                                        </Button>
                                    </Typography>
                                </>


                            )}
                        </Grid>
                    </Grid>

                </Card>
                <Toaster
                    open={toasterOpen}
                    message={toasterMessage}
                    severity={toasterSeverity}
                    onClose={handleCloseToaster}
                />
            </Container>
        </StyledBox>
    );
};

export default Login;
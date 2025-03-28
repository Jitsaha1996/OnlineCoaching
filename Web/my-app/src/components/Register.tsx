import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    CircularProgress,
    Backdrop,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { setStudent } from '../redux/studentsSlice';
import { RootState } from '../redux/store';
import imageCompression from 'browser-image-compression';
import { IStudents } from '../common/IStudents';
import ImagePreview from '../Utils/ImagePreview';
import Toaster from '../Utils/Toaster';

// Styled Box for form
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


const Register: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Loading state
    const studentData = useSelector((state: RootState) => state.students.studentsData) as IStudents | null;
    const [toasterOpen, setToasterOpen] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [toasterSeverity, setToasterSeverity] = useState<'success' | 'error'>('success');
    const [formData, setFormData] = useState<any>({
        sName: " ",
        parentEmail: "",
        parentPhone: "",
        sclass: "",
        confirmPassword: "",
        password: "",
        gender: "",
        pic: "",
        email: "",
        userType: "",
        dob: ""
    });

    const [imagePreview, setImagePreview] = useState<any>(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false); // New state for photo upload status

    useEffect(() => {
        if (studentData) {
            navigate("/student-details");
        }
        
    }, [studentData, navigate]);

    const handleChange = (e: any, index?: number) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleImageUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true); // Show loading state
            try {
                // Compress the image
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1, // Set max size in MB
                    maxWidthOrHeight: 1920, // Set max width or height
                });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({ ...formData, pic: reader.result as string });
                    setImagePreview(reader.result); // Set preview image
                    setIsPhotoUploaded(true);
                    setToasterOpen(true);
                    setToasterMessage('Successfully Uploaded');
                    // Show success toaster message
                    setTimeout(() => setLoading(false), 2000); // Hide loading after 2 seconds
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                setToasterOpen(true);
                setToasterMessage('Error uploading image:');
                console.error('Error uploading image:', error);
                setLoading(false);
            }
        }
    };

    const handleCloseToaster = () => {
        setToasterOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setToasterMessage("Passwords do not match");
            setToasterSeverity('error');
            setToasterOpen(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/students/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //token
                },
                body: JSON.stringify({
                    ...formData,
                    isArchived: false,
                    userType: "student",
                    parentEmail: "test@gmail.com",
                    gender:"male",
                    parentPhone: "12345",
                    sclass: "12",

                }),
            });

            if (!response.ok) throw new Error('Registration failed');
            const studentData = await response.json();
            dispatch(setStudent(studentData)); // Dispatch user data to Redux store

            setToasterMessage("Registration successful!");
            setToasterSeverity('success');
            setToasterOpen(true);

            // Use a timeout to delay the navigation so that toaster can show
            setTimeout(() => {
                setLoading(false); // Stop loading
                navigate('/student-details');
            }, 1500);

            setFormData({
                sName: " ",
                parentEmail: "",
                parentPhone: "",
                sclass: "",
                confirmPassword: "",
                password: "",
                gender: "",
                pic: "",
                email: "",
                userType: "",
                dob: ""
            });
            setIsPhotoUploaded(false); // Reset photo upload state after registration
        } catch (error: any) {
            setToasterMessage(error.message);
            setToasterSeverity('error');
            setToasterOpen(true);
            setLoading(false);
        }
    };

    return (
        <StyledBox>
            <Typography variant="h4" gutterBottom>
                Online Coaching
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '60%' }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="rName"
                        variant="outlined"
                        value={formData.rName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        variant="outlined"
                        value={formData.dob}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <Box sx={{ marginY: "20px" }}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-picture"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="upload-picture">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{
                                    backgroundColor: isPhotoUploaded ? 'green' : 'primary.main',
                                    '&:hover': {
                                        backgroundColor: isPhotoUploaded ? 'darkgreen' : 'primary.dark',
                                    },
                                }}
                            >
                                Upload Picture
                            </Button>
                        </label>
                        {imagePreview && <ImagePreview src={imagePreview} />}

                    </Box>

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
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>
                </Box>
            </form>
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Toaster
                open={toasterOpen}
                message={toasterMessage}
                severity={toasterSeverity}
                onClose={handleCloseToaster}
            />
        </StyledBox>
    );
};

export default Register;

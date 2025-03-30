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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
    // transition: 'transform 0.3s ease',
    // '&:hover': {
    //     transform: 'scale(1.02)',
    //     boxShadow: theme.shadows ? (theme.shadows as string[])[3] : 'none',
    //     maxWidth: '500px',
    //     width: '90%',
    //     margin: 'auto',
    //     overflow: 'hidden',
    // },
    boxShadow: theme.shadows ? (theme.shadows as string[])[3] : 'none',
    maxWidth: '700px',
    width: '90%',
    margin: 'auto',
    overflow: 'hidden',
}));
const StyledForm = styled('form')(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const validationSchema = z.object({
    // userType: z.string().min(1, "User Type is required"),
    sName: z.string().min(2, "Name must be at least 2 characters").max(120, "Name cannot exceed 120 characters"),
    email: z.string().email("Invalid email address"),
    dob: z.string().refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 10 && age <= 80;
    }, "Age must be between 10 and 80 years"),
    phone: z.string().regex(/^[6789]\d{9}$/, "Phone number must be 10 digits and start with 6, 7, 8, or 9"),
    password: z.string().min(10, "Password must be at least 10 characters").regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[a-z]/, "Must contain at least one lowercase letter").regex(/\d/, "Must contain at least one number").regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
}).refine((data) => {
    console.log("Password:", data.password, "Confirm Password:", data.confirmPassword);
    return data.password === data.confirmPassword;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(validationSchema),
        mode: "onBlur",
    });
    const userTypeOptions = ["Student", "Teacher"];
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // Loading state
    const studentData = useSelector((state: RootState) => state.students.studentsData) as IStudents | null;
    const [toasterOpen, setToasterOpen] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [toasterSeverity, setToasterSeverity] = useState<'success' | 'error'>('success');
    const [formData, setFormData] = useState<any>({
        userType: "",
        sName: " ",
        parentEmail: "",
        parentPhone: "",
        sclass: "",
        confirmPassword: "",
        password: "",
        gender: "",
        pic: "",
        email: "",
        dob: "",
        qualification: "",

    });

    const [imagePreview, setImagePreview] = useState<any>(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false); // New state for photo upload status

    useEffect(() => {
        if (studentData) {
            navigate("/student-details");
        }

    }, [studentData, navigate]);

    const handleChange = (e: any, index?: number) => {
        console.log("input element", e);
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

    const onSubmit = async () => {
        // e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setToasterMessage("Passwords do not match");
            setToasterSeverity('error');
            setToasterOpen(true);
            setLoading(false);
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
                    // userType: "student",
                    parentEmail: "test@gmail.com",
                    gender: "male",
                    parentPhone: "12345"

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

    const handleChangeSelect = (e: any) => {
        console.log("input element", e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <StyledBox>
            <Typography variant="h4" gutterBottom>
                Online Coaching
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ width: '60%' }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">UserType</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="userType"
                            value={formData.userType}
                            label="UserType"
                            onChange={handleChangeSelect}
                        >
                            {userTypeOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        {...register("sName")} error={!!errors.sName} helperText={errors.sName?.message}
                        label="Name"
                        name="sName"
                        variant="outlined"
                        value={formData.sName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        {...register("email")} error={!!errors.email} helperText={errors.email?.message}
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        {...register("dob")} error={!!errors.dob} helperText={errors.dob?.message}
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        variant="outlined"
                        value={formData.dob}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={formData.dob}
                            onChange={(newValue) => handleChange({ target: { name: 'dob', value: newValue } })}
                        />
                        <TextField
                            fullWidth
                            {...register("dob")} error={!!errors.dob} helperText={errors.dob?.message}
                            variant="outlined"
                            name="dob"
                            required
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </LocalizationProvider> */}
                    <TextField
                        fullWidth
                        {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message}
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        {...register("password")} error={!!errors.password} helperText={errors.password?.message}
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
                        {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {formData?.userType === "Student" ? <TextField
                        fullWidth
                        label="Class"
                        name="sclass"
                        type="text"
                        variant="outlined"
                        value={formData.sclass}
                        onChange={handleChange}
                        required
                    /> : formData?.userType === "Teacher" ?
                        <TextField
                            fullWidth
                            label="Qualification"
                            name="qualification"
                            type="text"
                            variant="outlined"
                            value={formData.qualification}
                            onChange={handleChange}
                            required
                        /> : null}



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

                    <StyledButton
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
                    </StyledButton>
                </Box>
            </StyledForm>
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

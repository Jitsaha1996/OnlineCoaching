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
    FormHelperText,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { setStudent } from '../redux/studentsSlice';
import { setTeacher } from '../redux/teachersSlice';
import { RootState } from '../redux/store';
import imageCompression from 'browser-image-compression';
import { IStudents } from '../common/IStudents';
import { ITeachers } from '../common/ITeachers';
import ImagePreview from '../Utils/ImagePreview';
import Toaster from '../Utils/Toaster';
import { z } from "zod";

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
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

const baseSchema = z.object({
    userType: z.enum(["Student", "Teacher"], {
        required_error: "User Type is required",
    }),
    sName: z.string().min(2, "Name must be at least 2 characters").max(120, "Name cannot exceed 120 characters").optional(),
    tName: z.string().min(2, "Name must be at least 2 characters").max(120, "Name cannot exceed 120 characters").optional(),
    email: z.string().email("Invalid email address"),
    dob: z.string().refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 10 && age <= 80;
    }, "Age must be between 10 and 80 years"),
    phone: z.string().regex(/^[6789]\d{9}$/, "Phone number must be 10 digits and start with 6, 7, 8, or 9"),
    password: z.string()
        .min(10, "Password must be at least 10 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/\d/, "Must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
    qualification: z.string().optional(),
    qualificationOther: z.string().optional(),
    sclass: z.string().optional(),
    sclassOther: z.string().optional(),
    parentPhone: z.string().optional(),
    parentEmail: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}).superRefine((data, ctx) => {
    if (data.userType === "Student") {
        if (!data.sName) {
            ctx.addIssue({
                path: ["sName"],
                code: z.ZodIssueCode.custom,
                message: "Name is required",
            });
        }
        if (!data.parentPhone) {
            ctx.addIssue({
                path: ["parentPhone"],
                code: z.ZodIssueCode.custom,
                message: "Parent phone is required for students",
            });
        }
        if (!data.parentEmail) {
            ctx.addIssue({
                path: ["parentEmail"],
                code: z.ZodIssueCode.custom,
                message: "Parent email is required for students",
            });
        }
        if (!data.sclass) {
            ctx.addIssue({
                path: ["sclass"],
                code: z.ZodIssueCode.custom,
                message: "Class is required for students",
            });
        }
        if (data.sclass === "Others") {
            if (!data.sclassOther || data.sclassOther.trim() === "") {
                ctx.addIssue({
                    path: ["sclassOther"],
                    code: z.ZodIssueCode.custom,
                    message: "Please specify your class",
                });
            }
        }
    }

    if (data.userType === "Teacher") {
        if (!data.tName) {
            ctx.addIssue({
                path: ["tName"],
                code: z.ZodIssueCode.custom,
                message: "Name is required",
            });
        }
        if (!data.qualification) {
            ctx.addIssue({
                path: ["qualification"],
                code: z.ZodIssueCode.custom,
                message: "Qualification is required for teachers",
            });
        }
        if (data.qualification === "Others") {
            if (!data.qualificationOther || data.qualificationOther.trim() === "") {
                ctx.addIssue({
                    path: ["qualificationOther"],
                    code: z.ZodIssueCode.custom,
                    message: "Please specify your class",
                });
            }
        }
    }
});

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(baseSchema),
        mode: "onBlur",
    });

    const userTypeOptions = ["Student", "Teacher"];
    const classOptions = ["10th Standard", "12th Standard", "Graduation", "Others"];
    const qualificationOptions = ["B.A.", "B.Com", "B.Sc", "B.Tech", "M.A.", "M.Com", "M.Sc", "M.Tech", "Others"];
    const experienceOptions = ["No Prior Experience", "1 - 5 years", "5 - 10 years", "More than 10 years"];
    const adminRequestOptions = ["Yes", "No"];
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const studentData = useSelector((state: RootState) => state.students.studentsData) as IStudents | null;
    const teacherData = useSelector((state: RootState) => state.teachers.teachersData) as ITeachers | null;
    const [toasterOpen, setToasterOpen] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [toasterSeverity, setToasterSeverity] = useState<'success' | 'error'>('success');
    const [formData, setFormData] = useState<any>({
        userType: "",
        sName: "",
        tName: "",
        parentEmail: "",
        parentPhone: "",
        sclass: "",
        sclassOther: "",
        confirmPassword: "",
        password: "",
        gender: "",
        pic: "",
        email: "",
        dob: "",
        qualification: "",
        qualificationOther: "",
        experience: "",
    });

    const [imagePreview, setImagePreview] = useState<any>(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (studentData) navigate("/student-details");
        else if (teacherData) navigate("/teacher-details");
    }, [studentData, teacherData, navigate]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true);
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData({ ...formData, pic: reader.result as string });
                    setImagePreview(reader.result);
                    setIsPhotoUploaded(true);
                    setToasterOpen(true);
                    setToasterMessage('Successfully Uploaded');
                    setTimeout(() => setLoading(false), 2000);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                setToasterOpen(true);
                setToasterMessage('Error uploading image');
                setLoading(false);
            }
        }
    };

    const handleCloseToaster = () => setToasterOpen(false);

    const onSubmit = async () => {
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setToasterMessage("Passwords do not match");
            setToasterSeverity('error');
            setToasterOpen(true);
            setLoading(false);
            return;
        }

        try {
            const selectedClass = formData.sclass === "Others" ? formData.sclassOther : formData.sclass;
            const selectedQualification = formData.qualification === "Others" ? formData.qualificationOther : formData.qualification;
            const user = formData.userType.toLowerCase();
            const apiUrl = `http://localhost:5000/api/${user}s/register`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    isArchived: false,
                    sclass: selectedClass,
                    qualification: selectedQualification,
                }),
            });

            if (!response.ok) throw new Error('Registration failed');
            const userData = await response.json();
            if (user === "student") dispatch(setStudent(userData));
            else if (user === "teacher") dispatch(setTeacher(userData));

            setToasterMessage("Registration successful!");
            setToasterSeverity('success');
            setToasterOpen(true);
            setTimeout(() => {
                setLoading(false);
                navigate(`/${user}-details`);
            }, 1500);

            setFormData({
                sName: "",
                tName: "",
                parentEmail: "",
                parentPhone: "",
                sclass: "",
                sclassOther: "",
                confirmPassword: "",
                password: "",
                gender: "",
                pic: "",
                email: "",
                userType: "",
                dob: "",
                qualification: "",
                qualificationOther: "",
                experience: "",
            });
            setIsPhotoUploaded(false);
        } catch (error: any) {
            setToasterMessage(error.message);
            setToasterSeverity('error');
            setToasterOpen(true);
            setLoading(false);
        }
    };

    const handleChangeSelect = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeClass = (e: any) => {
        const { name, value } = e.target;
        if (name === "sclass" && value !== "Others") setFormData({ ...formData, sclass: value, sclassOther: "" });
        else setFormData({ ...formData, [name]: value });
    };

    const handleChangeQualification = (e: any) => {
        const { name, value } = e.target;
        if (name === "qualification" && value !== "Others") setFormData({ ...formData, qualification: value, qualificationOther: "" });
        else setFormData({ ...formData, [name]: value });
    };

    return (
        <StyledBox>
            <Typography variant="h4" gutterBottom>
                Online Coaching
            </Typography>
            <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ width: '60%' }}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">UserType</InputLabel>
                        <Controller
                            name="userType"
                            control={control}
                            rules={{ required: "User Type is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="userType-label"
                                    id="userType"
                                    label="User Type"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChangeSelect(e);
                                    }}
                                >
                                    {userTypeOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.userType?.message}</FormHelperText>
                    </FormControl>

                    {formData.userType === "Student" ? (
                        <TextField
                            fullWidth
                            {...register("sName")} error={!!errors.sName} helperText={errors.sName?.message}
                            label="Name"
                            name="sName"
                            variant="outlined"
                            value={formData?.sName}
                            onChange={handleChange}
                            required
                        />
                    ) : (
                        <TextField
                            fullWidth
                            {...register("tName")} error={!!errors.tName} helperText={errors.tName?.message}
                            label="Name"
                            name="tName"
                            variant="outlined"
                            value={formData?.tName}
                            onChange={handleChange}
                            required
                        />
                    )}

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
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {formData?.userType === "Student" ? (
                        <>
                            <FormControl fullWidth error={!!errors.sclass} required>
                                <InputLabel id="class-select-label">Class</InputLabel>
                                <Controller
                                    name="sclass"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Class is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="class-select-label"
                                            label="Class"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleChangeClass(e); // your custom side-effect handler
                                            }}
                                        >
                                            {classOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.sclass?.message}</FormHelperText>
                            </FormControl>

                            {formData?.sclass === "Others" && (
                                <TextField
                                    fullWidth
                                    label="Specify Your Class"
                                    {...register("sclassOther", { required: "Please specify your class" })}
                                    value={formData.sclassOther}
                                    onChange={handleChange}
                                    error={!!errors.sclassOther}
                                    helperText={errors.sclassOther?.message}
                                />
                            )}
                            <TextField
                                fullWidth
                                {...register("parentPhone")} error={!!errors.parentPhone} helperText={errors.parentPhone?.message}
                                label="Parent's Phone Number"
                                name="parentPhone"
                                type="tel"
                                variant="outlined"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                fullWidth
                                {...register("parentEmail")} error={!!errors.parentEmail} helperText={errors.parentEmail?.message}
                                label="Parent's Email"
                                name="parentEmail"
                                type="email"
                                variant="outlined"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                required
                            />
                        </>
                    ) : formData?.userType === "Teacher" ? (
                        <>
                            <FormControl fullWidth error={!!errors.sclass} required>
                                <InputLabel id="qualification-select-label">Qualification</InputLabel>
                                <Controller
                                    name="qualification"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Qualification is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="qualification-select-label"
                                            label="Qualification"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleChangeQualification(e); // your custom side-effect handler
                                            }}
                                        >
                                            {qualificationOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.qualification?.message}</FormHelperText>
                            </FormControl>

                            {formData?.qualification === "Others" && (
                                <TextField
                                    fullWidth
                                    label="Mention Your Qualification"
                                    {...register("qualificationOther", { required: "Please mention your qualification" })}
                                    value={formData.qualificationOther}
                                    onChange={handleChange}
                                    error={!!errors.qualificationOther}
                                    helperText={errors.qualificationOther?.message}
                                />
                            )}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="experience"
                                    value={formData.experience}
                                    label="Experience"
                                    onChange={handleChangeSelect}
                                    required
                                >
                                    {experienceOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Request Admin Access</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="isAdmin"
                                    value={formData.isAdmin}
                                    label="Admin Access"
                                    onChange={handleChangeSelect}
                                    required
                                >
                                    {adminRequestOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </>
                    ) : null}

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
                        disabled={loading}  // Disable button when loading
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

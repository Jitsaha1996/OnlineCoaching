import React, {useState} from 'react'
import {
    AppBar,
    Box,
    Tab,
    Tabs,
    Typography,
    useTheme,
    styled,
} from '@mui/material';

import ClassDetails from './ClassDetails';
import BoardDetails from './BoardDetails';
import SubjectDetails from './SubjectDetails';



const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'relative',
    transition: 'background-color 0.3s',
    backgroundColor: theme.palette.primary.light,

    [theme.breakpoints.up('md')]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    [theme.breakpoints.down('sm')]: {
        display: "block" // or "inherit" to reset styles on small screens
    }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const TabContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align items to the start for better responsiveness
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        alignItems: 'center', // Center items on smaller screens
    },
}));

const ClassDetailsAdmin: React.FC = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
            <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
            <StyledAppBar position="static">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="inherit"
                    indicatorColor="primary"
                    sx={{
                        flexWrap: 'wrap', // Allows wrapping of tabs on smaller screens
                    }}
                >
                    <StyledTab label="Class Details" />
                    <StyledTab label="Board Details" />
                    <StyledTab label="Subject Details" />
                   
                </Tabs>
            </StyledAppBar>
            <TabContent>
                {activeTab === 0 && <Typography variant="h6"><ClassDetails/></Typography>}
                {activeTab === 1 && <Typography variant="h6"><BoardDetails/></Typography>}
                {activeTab === 2 && <Typography variant="h6"><SubjectDetails/></Typography>}
            </TabContent>
        </Box>
    );
}
export default ClassDetailsAdmin;
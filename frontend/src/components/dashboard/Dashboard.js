import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Assignment as TaskIcon,
    Event as CalendarIcon,
    Note as NoteIcon,
    Group as GroupIcon,
    Upload as UploadIcon,
    Assessment as ProgressIcon
} from '@mui/icons-material';

const Dashboard = () => {
    const { user } = useAuth();

    const features = [
        { name: 'Tasks', icon: <TaskIcon />, description: 'Manage your to-do list and assignments' },
        { name: 'Study Reminders', icon: <CalendarIcon />, description: 'Set and track study session reminders' },
        { name: 'Notes', icon: <NoteIcon />, description: 'Take and organize your study notes' },
        { name: 'Study Groups', icon: <GroupIcon />, description: 'Join or create study groups' },
        { name: 'Documents', icon: <UploadIcon />, description: 'Upload and manage study materials' },
        { name: 'Progress', icon: <ProgressIcon />, description: 'Track your academic progress' }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Message */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome back, {user?.username || 'Student'}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Access all your study tools and resources from this dashboard.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Quick Access Features */}
                {features.map((feature, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Paper 
                            sx={{ 
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 140,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                {feature.icon}
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {feature.name}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard; 
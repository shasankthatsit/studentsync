import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const Calendar = () => {
    const [currentDate] = useState(new Date());
    const [events] = useState([
        { id: 1, title: 'Math Study Group', date: '2024-04-10', time: '14:00' },
        { id: 2, title: 'Physics Lab', date: '2024-04-12', time: '10:00' },
        { id: 3, title: 'History Essay Due', date: '2024-04-15', time: '23:59' }
    ]);

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const renderCalendarDays = () => {
        const days = [];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Render days of week
        daysOfWeek.forEach(day => {
            days.push(
                <Grid item xs={1.7} key={`header-${day}`}>
                    <Typography align="center" color="textSecondary">
                        {day}
                    </Typography>
                </Grid>
            );
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <Grid item xs={1.7} key={`empty-${i}`}>
                    <Paper
                        sx={{
                            p: 2,
                            minHeight: 80,
                            bgcolor: 'grey.100'
                        }}
                    />
                </Grid>
            );
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const dayEvents = events.filter(event => event.date === dateString);

            days.push(
                <Grid item xs={1.7} key={day}>
                    <Paper
                        sx={{
                            p: 2,
                            minHeight: 80,
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        <Typography align="right">{day}</Typography>
                        {dayEvents.map(event => (
                            <Typography
                                key={event.id}
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    p: 0.5,
                                    borderRadius: 1,
                                    mt: 0.5
                                }}
                            >
                                {event.title}
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
            );
        }

        return days;
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton>
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="h5" sx={{ flex: 1, textAlign: 'center' }}>
                                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </Typography>
                            <IconButton>
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>
                        <Grid container spacing={2}>
                            {renderCalendarDays()}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Upcoming Events
                        </Typography>
                        <List>
                            {events.map(event => (
                                <ListItem key={event.id}>
                                    <ListItemText
                                        primary={event.title}
                                        secondary={`${event.date} at ${event.time}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Calendar; 
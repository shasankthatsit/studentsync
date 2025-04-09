import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Progress = () => {
    const [subjects, setSubjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [newSubject, setNewSubject] = useState({
        name: '',
        currentGrade: '',
        targetGrade: ''
    });

    useEffect(() => {
        // Mock data - replace with API call
        setSubjects([
            { id: 1, name: 'Mathematics', currentGrade: 85, targetGrade: 90 },
            { id: 2, name: 'Physics', currentGrade: 78, targetGrade: 85 },
            { id: 3, name: 'History', currentGrade: 92, targetGrade: 95 }
        ]);
    }, []);

    const handleAddSubject = () => {
        const subject = {
            id: subjects.length + 1,
            ...newSubject,
            currentGrade: Number(newSubject.currentGrade),
            targetGrade: Number(newSubject.targetGrade)
        };
        setSubjects([...subjects, subject]);
        setNewSubject({ name: '', currentGrade: '', targetGrade: '' });
        setOpen(false);
    };

    const handleDeleteSubject = (id) => {
        setSubjects(subjects.filter(subject => subject.id !== id));
    };

    const calculateProgress = (current, target) => {
        return (current / target) * 100;
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Academic Progress
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <List>
                            {subjects.map((subject) => (
                                <ListItem key={subject.id}>
                                    <ListItemText
                                        primary={subject.name}
                                        secondary={
                                            <Box component="div">
                                                <Box component="div">
                                                    Current Grade: {subject.currentGrade}%
                                                </Box>
                                                <Box component="div">
                                                    Target Grade: {subject.targetGrade}%
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={calculateProgress(subject.currentGrade, subject.targetGrade)}
                                                    sx={{ mt: 1 }}
                                                />
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteSubject(subject.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                    sx={{ mt: 2 }}
                >
                    Add Subject
                </Button>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Subject Name"
                            fullWidth
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Current Grade (%)"
                            fullWidth
                            type="number"
                            value={newSubject.currentGrade}
                            onChange={(e) => setNewSubject({ ...newSubject, currentGrade: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Target Grade (%)"
                            fullWidth
                            type="number"
                            value={newSubject.targetGrade}
                            onChange={(e) => setNewSubject({ ...newSubject, targetGrade: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddSubject} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default Progress;
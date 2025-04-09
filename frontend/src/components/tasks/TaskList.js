import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Checkbox,
    TextField,
    Button,
    Box
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon
} from '@mui/icons-material';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // TODO: Fetch tasks from backend
        const mockTasks = [
            { id: 1, text: 'Complete Math Assignment', completed: false },
            { id: 2, text: 'Study for Physics Test', completed: true },
            { id: 3, text: 'Read Chapter 5 of History', completed: false }
        ];
        setTasks(mockTasks);
    }, []);

    const handleAddTask = () => {
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                text: newTask,
                completed: false
            };
            setTasks([...tasks, task]);
            setNewTask('');
        }
    };

    const handleToggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Tasks
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddTask}
                        disabled={!newTask.trim()}
                    >
                        Add
                    </Button>
                </Box>

                <List>
                    {tasks.map((task) => (
                        <ListItem
                            key={task.id}
                            sx={{
                                bgcolor: 'background.paper',
                                mb: 1,
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={task.text}
                                sx={{
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? 'text.disabled' : 'text.primary'
                                }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => handleDeleteTask(task.id)}
                                    data-testid="DeleteIcon"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default TaskList; 
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Switch,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

const Settings = () => {
    const [settings, setSettings] = useState({
        darkMode: false,
        notifications: true,
        emailNotifications: false,
        autoSync: true
    });

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handlePasswordChange = () => {
        // Here you would typically make an API call to update the password
        console.log('Password change requested:', password);
        setPassword('');
        setOpen(false);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText 
                            primary="Dark Mode" 
                            secondary="Enable dark theme for better visibility in low light"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.darkMode}
                                onChange={() => handleToggle('darkMode')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText 
                            primary="Push Notifications" 
                            secondary="Receive notifications for important updates"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.notifications}
                                onChange={() => handleToggle('notifications')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText 
                            primary="Email Notifications" 
                            secondary="Receive email updates for important events"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText 
                            primary="Auto Sync" 
                            secondary="Automatically sync your data across devices"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.autoSync}
                                onChange={() => handleToggle('autoSync')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>

                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 3 }}
                    onClick={() => setOpen(true)}
                >
                    Change Password
                </Button>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handlePasswordChange} color="primary">
                            Update Password
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default Settings; 
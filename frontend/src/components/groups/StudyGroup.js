import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Box
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const StudyGroup = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Math Study Group', members: 5, subject: 'Mathematics' },
    { id: 2, name: 'Physics Lab Group', members: 4, subject: 'Physics' },
    { id: 3, name: 'Chemistry Study Group', members: 6, subject: 'Chemistry' }
  ]);
  const [newGroupName, setNewGroupName] = useState('');

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      setGroups([
        ...groups,
        {
          id: groups.length + 1,
          name: newGroupName,
          members: 1,
          subject: 'General'
        }
      ]);
      setNewGroupName('');
    }
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Study Groups
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="New Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddGroup}
            sx={{ mt: 1 }}
          >
            Add Group
          </Button>
        </Box>

        <List>
          {groups.map((group) => (
            <ListItem key={group.id}>
              <ListItemText
                primary={group.name}
                secondary={`${group.members} members • ${group.subject}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default StudyGroup; 
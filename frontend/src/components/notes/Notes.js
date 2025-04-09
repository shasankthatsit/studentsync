import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon
} from '@mui/icons-material';

const Notes = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: 'Math Formulas', content: 'Important formulas for calculus...' },
        { id: 2, title: 'Physics Notes', content: 'Key concepts from Chapter 5...' },
        { id: 3, title: 'History Timeline', content: 'Major events in World War II...' }
    ]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [editingId, setEditingId] = useState(null);

    const handleAddNote = () => {
        if (newNote.title.trim() && newNote.content.trim()) {
            const note = {
                id: Date.now(),
                title: newNote.title,
                content: newNote.content
            };
            setNotes([...notes, note]);
            setNewNote({ title: '', content: '' });
        }
    };

    const handleEditNote = (note) => {
        setEditingId(note.id);
        setNewNote({ title: note.title, content: note.content });
    };

    const handleSaveEdit = (noteId) => {
        setNotes(notes.map(note =>
            note.id === noteId
                ? { ...note, title: newNote.title, content: newNote.content }
                : note
        ));
        setEditingId(null);
        setNewNote({ title: '', content: '' });
    };

    const handleDeleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Notes
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    id="new-note-title"
                                    data-testid="new-note-title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Content"
                                    id="new-note-content"
                                    data-testid="new-note-content"
                                    multiline
                                    rows={4}
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={handleAddNote}
                                    disabled={!newNote.title.trim() || !newNote.content.trim()}
                                >
                                    Add Note
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {notes.map((note) => (
                    <Grid item xs={12} md={6} lg={4} key={note.id}>
                        <Card>
                            <CardContent>
                                {editingId === note.id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            id={`edit-note-title-${note.id}`}
                                            data-testid={`edit-note-title-${note.id}`}
                                            value={newNote.title}
                                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Content"
                                            id={`edit-note-content-${note.id}`}
                                            data-testid={`edit-note-content-${note.id}`}
                                            multiline
                                            rows={4}
                                            value={newNote.content}
                                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                            margin="normal"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h6" gutterBottom>
                                            {note.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {note.content}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                            <CardActions>
                                {editingId === note.id ? (
                                    <IconButton 
                                        onClick={() => handleSaveEdit(note.id)}
                                        data-testid={`save-note-${note.id}`}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton 
                                        onClick={() => handleEditNote(note)}
                                        data-testid="EditIcon"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}
                                <IconButton 
                                    onClick={() => handleDeleteNote(note.id)}
                                    data-testid="DeleteIcon"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Notes; 
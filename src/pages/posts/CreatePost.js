
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); 
    setEditedTitle('');
    setEditedContent('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editIndex !== null) {
    
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = { title: editedTitle, content: editedContent };
      setPosts(updatedPosts);
    } else {
    
      const post = { title, content };
      setPosts([...posts, post]);
    }

    setTitle('');
    setContent('');
    setEditedTitle('');
    setEditedContent('');
    handleClose();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTitle(posts[index].title);
    setEditedContent(posts[index].content);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
      <h2>Create Post</h2>
      <Button variant="outlined" onClick={handleClickOpen} style={{ marginBottom: '15px' }}>
        Create Your Personal Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Post' : 'Create Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={editIndex !== null ? editedTitle : title}
                onChange={(e) => (editIndex !== null ? setEditedTitle(e.target.value) : setTitle(e.target.value))}
                required
              />
            </div>
            <div>
              <TextField
                margin="dense"
                id="content"
                label="Content"
                multiline
                rows={4}
                fullWidth
                value={editIndex !== null ? editedContent : content}
                onChange={(e) => (editIndex !== null ? setEditedContent(e.target.value) : setContent(e.target.value))}
                required
              />
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {posts.map((post, index) => (
          <Card key={index} sx={{ minWidth: 275, margin: '10px', position: 'relative', width: '300px' }}>
            {/* Edit icon */}
            <EditIcon
              color="primary"
              sx={{ position: 'absolute', top: 5, right: 40, cursor: 'pointer' }}
              onClick={() => handleEdit(index)}
            />
            <DeleteIcon
              color="primary"
              sx={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
              onClick={() => handleDelete(index)}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Title: {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Content: {post.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;



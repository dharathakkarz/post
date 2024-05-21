


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, deletePost } from '../../redux/action/Action';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CreatePost = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setContent('');
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleSubmit = () => {
    if (isEditing && currentPost) {
      // Update the post
      currentPost.title = title;
      currentPost.content = content;
    } else {
      // Create new post
      dispatch(createPost(title, content));
    }
    setTitle('');
    setContent('');
    handleClose();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setCurrentPost(post);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = (postId) => {
    console.log("Deleting post with id:", postId);
    dispatch(deletePost(postId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Button variant="outlined" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              id="content"
              label="Content"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEditing ? 'Update Post' : 'Create Post'}</Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {posts.map(post => (
          <div key={post.id} style={{ position: 'relative', width: '300px', margin: '10px' }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Title: {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                  Content: {post.content}
                </Typography>
              </CardContent>
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
                <EditIcon color="primary" onClick={() => handleEdit(post)} />
                <DeleteIcon color="primary" onClick={() => handleDelete(post.id)} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/action/Action';
import { Card, CardContent, Typography, Grid, IconButton, Box, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import CreatePost from './CreatePost';

const Post = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state);
  const posts = useSelector(state => state.posts); 
  const [localPosts, setLocalPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: '', body: '' });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    setLocalPosts(posts); 
  }, [posts]);

  const handleDelete = (postId) => {
    const updatedPosts = localPosts.filter(post => post.id !== postId);
    setLocalPosts(updatedPosts);
  };

  const handleEdit = (postId, postTitle, postBody) => {
    setEditingPostId(postId);
    setEditedPost({ title: postTitle, body: postBody });
  };

  const handleSaveEdit = (postId) => {
    const updatedPosts = localPosts.map(post => {
      if (post.id === postId) {
        return { ...post, title: editedPost.title, body: editedPost.body };
      }
      return post;
    });
    setLocalPosts(updatedPosts);
    setEditingPostId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
   
<>
{/* <CreatePost/> */}
    <Grid container spacing={3} justifyContent="center">
      {localPosts.map(post => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {editingPostId === post.id ? (
                  <TextField
                    name="title"
                    value={editedPost.title}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                ) : (
                  <Typography variant="h5" component="div">
                    Title: {post.title}
                  </Typography>
                )}
                <Box sx={{ display: 'flex' }}>
                  <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(post.id, post.title, post.body)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(post.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              {editingPostId === post.id ? (
                <Box>
                  <TextField
                    name="body"
                    value={editedPost.body}
                    onChange={handleChange}
                    multiline
                    variant="outlined"
                    fullWidth
                  />
                  <Button onClick={() => handleSaveEdit(post.id)}>Save</Button>
                </Box>
              ) : (
                <Typography variant="body2">
                  <b>Content:</b> {post.body}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default Post;


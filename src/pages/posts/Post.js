
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../../redux/action/Action';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import {message,toaststyle} from '../../constant/Message'
import CreatePost from './CreatePost';

const Post = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    toast.error(message.DELETE, {
      ...toaststyle
    });
  };


  return (
    <>
    <CreatePost/>

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: '15px' }}>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <Card variant="outlined" sx={{ height: 250, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <CardActions  sx={{ position: 'absolute', top: 5, right: 10, cursor: 'pointer' }}>
                <Button size="small">
                  <EditIcon />
                </Button>
                <Button size="small" onClick={handleDelete} sx={{ position: 'absolute', top: 5, left: 35, cursor: 'pointer' }}> {/* Adjust the margin as needed */}
                  <DeleteIcon />
                </Button>
              </CardActions>

              <CardContent sx={{ flex: 1, overflow: 'auto' }}>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Post {post.id}
                </Typography> */}
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  User ID: {post.userId}
                </Typography> */}
                <Typography variant="body2">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Post;

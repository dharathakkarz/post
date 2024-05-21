
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserAlbumsAndTodos } from '../../redux/action/Action';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AllUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'false') {
      navigate('/login');
    }
  }, []); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCardClick = async (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  
    try {
      const response = await dispatch(fetchUserAlbumsAndTodos(user.id));
      setUserAlbums(response.albums);
      setUserTodos(response.todos);
    } catch (error) {
      console.error('Error fetching albums and todos:', error);
    }
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setUserAlbums([]);
    setUserTodos([]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {userData.loading ? (
        <h2>Loading...</h2>
      ) : userData.error ? (
        <h2>{userData.error}</h2>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {userData.map(user => (
            <Card key={user.id} sx={{ minWidth: 275, maxWidth: 300, margin: '10px', cursor: 'pointer' }} onClick={() => handleCardClick(user)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  @{user.username}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                  <br />
                  <strong>Geo:</strong> ({user.address.geo.lat}, {user.address.geo.lng})
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <h2 id="modal-modal-title">{selectedUser ? `${selectedUser.name}'s Albums and Todos` : 'User\'s Albums and Todos'}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <h3>Albums:</h3>
              <ul>
                {userAlbums.map(album => (
                  <li key={album.id}>{album.title}</li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <h3>Todos:</h3>
              <ul>
                {userTodos.length > 0 ? (
                  userTodos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                  ))
                ) : (
                  <li>No todos found</li>
                )}
              </ul>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AllUser;

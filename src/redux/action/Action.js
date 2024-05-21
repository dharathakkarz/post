



import axios from 'axios';
import {EDIT_POST, CREATE_POST,CREATE_POST_SUCCESS,FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, DELETE_POST, CREATE_POST_FAIL, ADD_POST, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USER_ALBUMS_REQUEST, FETCH_USER_ALBUMS_FAILURE, FETCH_USER_ALBUMS_SUCCESS, FETCH_USER_TODOS_REQUEST, FETCH_USER_TODOS_SUCCESS, FETCH_USER_TODOS_FAILURE } from '../../constant/ActionType';



export const createPost = (title, content) => ({
  type: CREATE_POST,
  payload: {
    title,
    content
  }
});


export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: { id },
});

export const updatePost = (id, title, content) => ({
  type: EDIT_POST,
  payload: {
    id,
    title,
    content,
  },
});

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = (error) => ({
  
  type: FETCH_USERS_FAILURE,
  
  payload: error
  
});

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('Response from API:', response.data);

    dispatch(fetchUsersSuccess(response.data));

  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};


export const fetchUserAlbumsRequest = () => ({
  type: FETCH_USER_ALBUMS_REQUEST,
});

export const fetchUserAlbumsSuccess = (albums) => ({
  type: FETCH_USER_ALBUMS_SUCCESS,
  payload: albums,
});

export const fetchUserAlbumsFailure = (error) => ({
  type: FETCH_USER_ALBUMS_FAILURE,
  payload: error,
});

export const fetchUserTodosRequest = () => ({
  type: FETCH_USER_TODOS_REQUEST,
});

export const fetchUserTodosSuccess = (todos) => ({
  type: FETCH_USER_TODOS_SUCCESS,
  payload: todos,
});

export const fetchUserTodosFailure = (error) => ({
  type: FETCH_USER_TODOS_FAILURE,
  payload: error,
});
export const fetchUserAlbumsAndTodos = (userId) => async (dispatch) => {
  dispatch(fetchUserAlbumsRequest());
  dispatch(fetchUserTodosRequest());

  try {
    const [albumsResponse, todosResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`),
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`),
    ]);
    console.log('Fetched albums:', albumsResponse.data);
    console.log('Fetched todos:', todosResponse.data);

    dispatch(fetchUserAlbumsSuccess(albumsResponse.data));
    dispatch(fetchUserTodosSuccess(todosResponse.data));

    return { albums: albumsResponse.data, todos: todosResponse.data }; 
  } catch (error) {
    dispatch(fetchUserAlbumsFailure(error.message));
    dispatch(fetchUserTodosFailure(error.message));
    throw error; 
  }
};

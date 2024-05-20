
import axios from 'axios';
import {EDIT_POST, CREATE_POST,CREATE_POST_SUCCESS,FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, DELETE_POST, CREATE_POST_FAIL, ADD_POST, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USER_ALBUMS_REQUEST, FETCH_USER_ALBUMS_FAILURE, FETCH_USER_ALBUMS_SUCCESS, FETCH_USER_TODOS_REQUEST, FETCH_USER_TODOS_SUCCESS, FETCH_USER_TODOS_FAILURE } from '../../constant/ActionType';

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTS });

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_POSTS_FAIL, payload: error.message });
  }
};


export const deletePost = (index) => ({
  type: DELETE_POST,
  payload: index,
});

export const updatePost = (index, post) => ({
  type: EDIT_POST,
  payload: { index, post },
});



export const createPost = (post) => async (dispatch) => {
  dispatch({ type: CREATE_POST });

  try {

    await new Promise(resolve => setTimeout(resolve, 1000));
   
    
    dispatch({ type: CREATE_POST_SUCCESS, payload: post });
    console.log('Created post:', post); 
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.message });
  }
};

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

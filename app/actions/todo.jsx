import { ADD_TODO, REQUEST_TODOS, RECEIVE_TODOS, REQUEST_ERROR } from './types';
import axios from 'axios';

export function addTodo(id, title, done) {
  return {
    type: ADD_TODO,
    id,
    title,
    done,
  }
}

export function requestTodo() {
  return {
    type: REQUEST_TODOS,
  }
}

export function receiveTodos(todos) {
  return {
    type: RECEIVE_TODOS,
    todos,
  }
}

export function requestError() {
  return {
    type: REQUEST_ERROR,
  }
}

export function getAllTodos() {
  return function(dispatch) {
    dispatch(requestTodo());
    return axios.get('http://127.0.0.1:8000')
      .then(function (response) {
        console.log(response.data.todos);
        return dispatch(receiveTodos(response.data.todos));
      })
      .catch(function (error) {
        console.log(error);
        return dispatch(requestError());
      });
  }
}

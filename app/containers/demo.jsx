import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as todoActions from 'actions/todo';

class demo extends Component {

  componentWillMount() {
    this.props.getAllTodos();
  }

  provide_time() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  showTodos() {
    const task = this.props.todo.todos.length;
    const todos = this.props.todo.todos;
    if (task > 0) {
      return todos.this.map(todo => {
        console.log(todo.get.title);
        return <p key={todo.id}>{todo.title}</p>;
      });
    }
    else {
      return (
        <p></p>
      );
    }

  }

  render() {
    const time = this.provide_time();
    return (
      <div>
        {this.showTodos()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo,
  }
}

export default connect(mapStateToProps, {...todoActions})(demo);

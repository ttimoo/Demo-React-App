import React, { Component } from 'react';
import moment from 'moment';

export default class Demo extends Component {

  provide_time() {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  render() {
    const time = this.provide_time();
    return (
      <div>
        <h1>Hello World!</h1>
        <h3>{time}</h3>
        <button>Demo button</button>
      </div>
    );
  }
}

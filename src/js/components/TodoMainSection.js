import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

class TodoMainSection extends React.Component {
  render() {
    if(this.props.allTodos.length < 1){
      return null;
    }
    var allTodos = this.props.allTodos;
    var todos = [];
    for(var key in allTodos){
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <ul id="todo-list">
          {todos}
        </ul>
      </section>
    );
  }
}

export default TodoMainSection;

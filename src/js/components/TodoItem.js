import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  render(){
    var todo = this.props.todo;
    var input;
    if(this.state.isEditing){
      input = <TodoTextInput
        className="edit"
        onSave={this.onSave.bind(this)}
        value={todo.text}
        />;
    }

    var className = '';
    if(todo.complete){
      className += 'completed';
    }
    if(this.state.isEditing){
      className += 'editing';
    }

    className = className.trim();

    return (
      <li className={className} key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this.onToggleComplete.bind(this)}
          />
          <label onDoubleClick={this.onDoubleClick.bind(this)} >
            {todo.text}
          </label>
          <button className="destroy" onClick={this.onDestroy.bind(this)} />
        </div>
        {input}
      </li>
    );
  }

  onToggleComplete(){
    TodoActions.toggleComplete(this.props.todo);
  }

  onDoubleClick(){
    this.setState({
      isEditing: true
    });
  }

  onSave(text){
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({
      isEditing: false
    });
  }

  onDestroy(){
    TodoActions.destroy(this.props.todo.id);
  }
}

export default TodoItem;

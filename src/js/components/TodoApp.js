import React from 'react';
import TodoMainSection from './TodoMainSection';
import TodoHeader from './TodoHeader';
import TodoStore from '../stores/TodoStore';
import TodoFooter from './TodoFooter';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodos: {}
    };

    this.onTodosChange = this.onTodosChange.bind(this);
  }

  componentDidMount(){
    console.log('mount component');
    TodoStore.todosStream.onValue(this.onTodosChange);
  }

  componentWillUnmount(){
    console.log('unmount component');
    TodoStore.todosStream.offValue(this.onTodosChange);
  }

  onTodosChange(newTodos){
    console.log('onTodosChange App');
    this.setState({allTodos: newTodos})
  }

  render(){
    return (
      <div>
        <TodoHeader />
        <TodoMainSection allTodos={this.state.allTodos} />
        <TodoFooter allTodos={this.state.allTodos} />
      </div>
    );
  }
}

export default TodoApp;

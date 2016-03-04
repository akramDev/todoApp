import Kefir from 'kefir';
import AppDispatcher from '../dispatchers/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

var createActionsStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_CREATE)
    .map(action => {
      console.log('Create Todo Store');
      var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      return {
        id: id,
        complete: false,
        text: action.text
      };
    })
    .map(todo => todos => {
      todos[todo.id] = todo;
      return todos;
    });

var updateActionsStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_UPDATE_TEXT)
    .map(action => todos => {
      console.log('update Todo Store');
      todos[action.id].text = action.text;
      return todos;
    });

var toggleUnCompletActionsStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_UNDO_COMPLETE)
    .map(action => todos => {
      console.log('Toggle Uncomplete Todo Store');
      todos[action.id].complete = false;
      return todos;
    });

var toggleCompletActionsStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_COMPLETE)
    .map(action => todos => {
      console.log('Toggle complete Todo Store');
      todos[action.id].complete = true;
      return todos;
    });

var destroyActionStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_DESTROY)
    .map(action => todos => {
      console.log('Destroy Todo Store');
      delete todos[action.id];
      return todos;
    });

var clearCompletedActionStream = AppDispatcher
    .filter(action => action.actionType === TodoConstants.TODO_DESTROY_COMPLETED)
    .map(action => todos => {
      console.log('Clear Completed Todo Store');
      for(var key in todos){
        if(todos[key].complete){
          delete todos[key];
        }
      }
      return todos;
    });

var todosStream = Kefir
        .merge([
            createActionsStream,
            updateActionsStream,
            toggleCompletActionsStream,
            toggleUnCompletActionsStream,
            destroyActionStream,
            clearCompletedActionStream
        ])
        .scan((prevTodos, modificationFunc) => modificationFunc(prevTodos), {});

export default {
  todosStream: todosStream
}

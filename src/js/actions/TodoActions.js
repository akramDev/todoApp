import AppDispatcher from '../dispatchers/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

class TodoActions {

  static create(text){
    console.log('create Todo Action');
    AppDispatcher.emit({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  }

  static updateText(id, text){
    console.log('update Todo Action');
    AppDispatcher.emit({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  }

  static toggleComplete(todo){
    if(todo.complete){
      console.log('toggle uncomplete Todo Action');
      AppDispatcher.emit({
        actionType: TodoConstants.TODO_UNDO_COMPLETE,
        id: todo.id
      });
    }else{
      console.log('toggle complete Todo Action');
      AppDispatcher.emit({
        actionType: TodoConstants.TODO_COMPLETE,
        id: todo.id
      });
    }
  }

  static destroy(id){
    console.log('Delete Todo Action');
    AppDispatcher.emit({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  }

  static clearCompleted(){
    console.log('Clear Completed Todo Action');
    AppDispatcher.emit({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

}

export default TodoActions;

import { useEffect, useState } from 'react';
import classes from './styles.module.css';
import TodoItem from './components/todo-items';
import TodoDetails from './components/todo-details';
import { Skeleton } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchTodoLists() {
    try {
      setLoading(true);
      const todoApi = await fetch('https://dummyjson.com/todos');
      const result = await todoApi.json();

      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
        setErrorMsg('');
      } else {
        setTodoList([]);
        setLoading(false);
        setErrorMsg('');
      }
    } catch (e) {
      console.log(e);
      setErrorMsg('Some Error occured.');
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiResponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>ToDoList using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {loading ? (
          <Skeleton variant="rectangular" width={250} height={250} />
        ) : todoList && todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <TodoItem
              todo={todoItem}
              fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
              key={todoItem.id}
            />
          ))
        ) : null}
      </div>
      <TodoDetails
        openDialog={openDialog}
        todoDetails={todoDetails}
        setOpenDialog={setOpenDialog}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
}

export default App;

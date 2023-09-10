import {
  Container,
  TextField,
  AppBar,
  Stack,
  Button,
  Typography,
  Toolbar,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useState,useEffect } from "react";
import { getTodos, saveTodos } from "./components/saveTodo";

const App = () => {
  // const saved = localStorage.getItem(JSON.parse(todos))
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  useEffect(() => {
    saveTodos(todos)
    
  }, [todos])
  
  const submitHandler = (title: TodoItemType["title"]) => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Date.now()),
    };
 setTodos([...todos, newTodo]);
    setTitle("");

  };

  const completehandler = (id: TodoItemType["id"]): void => {
    const thatTodo: TodoItemType[] = todos.map((t) => {
      if (t.id === id) t.isCompleted = !t.isCompleted;

      return t;
    });
    setTodos(thatTodo);
  };
  const deltehandler = (id: TodoItemType["id"]): void => {
    const thatTodo:TodoItemType[]=todos.filter((t)=>t.id!==id)
    setTodos(thatTodo);
    console.log(todos)
  };

  return (
    <Container maxWidth="sm" sx={{ height: "84vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack  direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            completeHandler={completehandler}
            deleteHandler={deltehandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler(title);
        }}
        label={"Add task"}
      />
      <Button
        onClick={() => submitHandler(title)}
        variant="contained"
        fullWidth
        sx={{ margin: "0.5rem 0" }}
        disabled={title === ""}
      >
        Add
      </Button>
    </Container>
  );
};
export default App;

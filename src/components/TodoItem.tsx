import {
  Checkbox,
  Paper,
  Button,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
// import { saveTodos } from "./saveTodo";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
};

const TodoItem = ({ todo, completeHandler, deleteHandler }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [textval, setTextval] = useState<TodoItemType["title"]>(todo.title);

  const edithandler = () => {
    todo.title = textval;
    setOpen(false);
  };

  return (
    <Paper variant="outlined" sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {open ? (
          <TextField
          sx={{marginRight:"auto"}}
            value={textval}
            onChange={(e) => setTextval(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textval !== todo.title) {
                edithandler();
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button variant="outlined" onClick={() => setOpen(true)}>
          🖊️
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteHandler(todo.id)}
        >
          🗑️
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;

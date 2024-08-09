/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

function TodoItem({ todo, fetchDetailsOfCurrentTodo }) {
  return (
    <Card
      onClick={() => fetchDetailsOfCurrentTodo(todo?.id)}
      sx={{
        maxWidth: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography variant="h5" color={'text.secondary'}>
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            opacity: '0.75',
            '&:hover': {
              backgroundColor: '#000',
              color: '#fff',
              opacity: '1',
            },
          }}
        >
          Show Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default TodoItem;

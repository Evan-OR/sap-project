import { Paper, Box, Typography, TextField, Button, Divider } from '@mui/material';
import Task from './Task';
import { useEffect, useState } from 'react';

type TaskData = {
  id: number;
  title: string;
  content: string;
};

const TaskView = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [formInput, setFormInput] = useState({ title: '', content: '' });

  const getTasks = async () => {
    try {
      const req = await fetch('/api/tasks');

      if (!req.ok) throw new Error(`request failed: ${req.status}`);

      const tasks = await req.json();
      console.log(tasks);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const postTask = async () => {
    try {
      const { title, content } = formInput;

      if (!title || !content) {
        return;
      }

      const req = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!req.ok) throw new Error(`request failed: ${req.status}`);

      setFormInput({ title: '', content: '' });
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <Box flex={'flex'} flexDirection={'column'} py={1} px={2} gap={1}>
        <Typography variant="h4">Create Task</Typography>

        <Box mt={1}>
          <TextField
            value={formInput.title}
            onChange={(e) => setFormInput((prev) => ({ ...prev, title: e.target.value }))}
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box mt={1}>
          <TextField
            value={formInput.content}
            onChange={(e) => setFormInput((prev) => ({ ...prev, content: e.target.value }))}
            id="title"
            label="Content"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box display={'flex'} mt={1} justifyContent={'end'}>
          <Button onClick={postTask} variant="contained">
            Post
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box flex={'flex'} flexDirection={'column'} m={1} p={1} gap={1}>
        <Typography variant="h4">Task List</Typography>

        {tasks ? (
          tasks.map((t, i) => <Task key={i} idx={i + 1} title={t.title} content={t.content}></Task>)
        ) : (
          <Box>No tasks :(</Box>
        )}
      </Box>
    </Paper>
  );
};

export default TaskView;

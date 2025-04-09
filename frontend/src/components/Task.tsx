import { Box, Typography } from '@mui/material';

type TaskProps = {
  title: string;
  content: string;
  idx: number;
};

const Task = ({ title, content, idx }: TaskProps) => {
  return (
    <Box py={1}>
      <Typography variant="h6" fontWeight={'bold'}>
        {idx}. {title}
      </Typography>
      <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: content }}></Typography>
    </Box>
  );
};

export default Task;

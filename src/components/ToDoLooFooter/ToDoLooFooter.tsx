import { Box } from '@mui/material';

export const ToDoLooFooter = () => {
  return (
    <Box component='footer'>
      <Box
        sx={(theme) => ({
          px: theme.spacing(1),
          py: theme.spacing(2),
        })}
      >
        footer
      </Box>
    </Box>
  );
};

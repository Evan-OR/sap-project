import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { login, register } from '../utils/requests';

type LoginRegistrationProps = {
  setUserLogInTrue: () => void;
};

const LoginRegistration = ({ setUserLogInTrue }: LoginRegistrationProps) => {
  const [formType, setFormType] = useState<'login' | 'register'>('register');
  const [formInput, setFormInput] = useState<{ email: string; username: string; password: string }>({
    email: '',
    username: '',
    password: '',
  });

  const toggleFormType = () => {
    setFormType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const reqFunction = () => {
    const { email, username, password } = formInput;

    if (!username || !password || (formType === 'register' && !email)) return;

    const funcs = {
      login: () => login(username, password),
      register: () => register(email, username, password),
    };
    try {
      funcs[formType]();
      setUserLogInTrue();
    } catch (err) {
      console.error(err);
      console.error('IDK');
    }
  };

  return (
    <Paper>
      <Box flex={'flex'} flexDirection={'column'} py={1} px={2} gap={1}>
        <Typography variant="h4">Sign In</Typography>

        {formType === 'register' && (
          <Box mt={1}>
            <TextField
              value={formInput.email}
              onChange={(e) => setFormInput((prev) => ({ ...prev, email: e.target.value }))}
              id="form-email"
              label="email"
              variant="outlined"
              fullWidth
            />
          </Box>
        )}

        <Box mt={1}>
          <TextField
            value={formInput.username}
            onChange={(e) => setFormInput((prev) => ({ ...prev, username: e.target.value }))}
            id="form-username"
            label="username"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box mt={1}>
          <TextField
            value={formInput.password}
            onChange={(e) => setFormInput((prev) => ({ ...prev, password: e.target.value }))}
            id="form-password"
            label="password"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box display={'flex'} mt={1} justifyContent={'space-between'}>
          <Box>
            <Button onClick={toggleFormType}>{formType === 'login' ? 'register' : 'login'}</Button>
          </Box>

          <Box>
            <Button onClick={reqFunction} variant="contained">
              {formType}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginRegistration;

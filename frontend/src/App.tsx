import { Box, Button } from '@mui/material';
import TaskView from './components/TaskView';
import LoginRegistration from './components/LoginRegistration';
import Cookie from 'js-cookie';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(Cookie.get('auth_token') ? true : false);

  const signOut = () => {
    Cookie.remove('auth_token');
    Cookie.remove('user_data');
    setLoggedIn(false);
  };

  const setUserLogInTrue = () => setLoggedIn(true);

  return (
    <Box display={'flex'} justifyContent={'center'} mt={4} gap={2}>
      <Box width={'350px'}></Box>

      <Box width={'600px'}>
        <TaskView />
      </Box>

      <Box width={'350px'}>
        {loggedIn ? (
          <Button onClick={signOut}>Sign out</Button>
        ) : (
          <LoginRegistration setUserLogInTrue={setUserLogInTrue} />
        )}
      </Box>
    </Box>
  );
}

export default App;

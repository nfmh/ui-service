import { useState } from 'react';

const useForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
  };
};

export default useForm;

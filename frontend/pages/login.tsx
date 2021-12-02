import { NextPage } from 'next';
import { FormEvent, FormEventHandler, useState } from 'react';
import { useAuth } from '../lib/auth';

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useAuth()!;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn({ username, password });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

import { NextPage } from 'next';
import React, { FormEvent, useState } from 'react';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';
import LoginBox from '../components/LoginBox';

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useAuth()!;
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    await signIn({ username, password });
    router.push('/schedules');
  }

  return (
    <div>
      <LoginBox
        onSubmit={onSubmit}
        onChangeUserName={(e) => setUsername(e.target.value)}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Login;

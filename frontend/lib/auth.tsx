import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  FC,
  Provider,
} from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';

type ProvideAuthType = {
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  isSignedIn: () => boolean;
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  createApolloClient: () => ApolloClient<NormalizedCacheObject>;
};
const authContext = createContext<ProvideAuthType | null>(null);

export function AuthProvider(props: { children: ReactNode }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {props.children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState('');
  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    const link = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation signin($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          accessToken
        }
      }
    `;

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    });

    if (result?.data?.login?.accessToken) {
      setAuthToken(result.data.login.accessToken);
    }
  };

  const signOut = () => {
    setAuthToken('');
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  };
}

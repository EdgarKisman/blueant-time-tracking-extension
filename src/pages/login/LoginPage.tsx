import React, { useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
  Notification,
} from "grommet";
import { login } from "../../api/base/requests/login";
import {
  Credentials,
  RequestError,
  BlueAntSession,
  AuthData,
} from "../../api/base/typings";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<RequestError | undefined>(undefined);
  const [authentication, setAuthentication] = useState<AuthData>(
    {} as AuthData
  );

  const handleSubmit = ({ value }: { value: Credentials }) => {
    login({ username: value.username, password: value.password })
      .then((response) =>
        setAuthentication({ credentials: value, session: response })
      )
      .catch((error: RequestError) => setError(error));
  };

    return (
        <Box align="center" pad="large">
            <Heading level={2}>Login</Heading>
            <Form onSubmit={handleSubmit}>
                <FormField label="Username" name="username">
                    <TextInput
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </FormField>
                <FormField label="Password" name="password">
                    <TextInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </FormField>
                <Box direction="row" justify="center" margin={{top: "medium"}}>
                    <Button type="submit" label="Login" primary fill="horizontal"/>
                </Box>
            </Form>
            <Text>Person ID</Text>
            <Text>{authentication.session?.personID}</Text>
            <Text>Session ID</Text>
            <Text>{authentication.session?.sessionID}</Text>
            {error &&
                <Notification
                    toast
                    status="critical"
                    title={error.statusCode.toString()}
                    message={error.message}
                    onClose={() => setError(undefined)}
                />
            }
        </Box>
    )
}

export default LoginPage;

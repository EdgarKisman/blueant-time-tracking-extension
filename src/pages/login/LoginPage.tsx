import React, {useState} from "react"
import {Box, Button, Form, FormField, Heading, Text, TextInput, Notification} from "grommet"
import {login} from "../../api/base/requests/login"
import {Credentials, RequestError, UserSession} from "../../api/base/typings";

const LoginPage = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [response, setResponse] = useState<UserSession | undefined>(undefined)
    const [error, setError] = useState<RequestError | undefined>(undefined)

    const handleSubmit = ({value}: { value: Credentials }) => {
        login({username: value.username, password: value.password})
            .then((response) => setResponse(response))
            .catch((error: RequestError) => setError(error))
    }

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
            <Text>{response?.personID}</Text>
            <Text>Session ID</Text>
            <Text>{response?.sessionID}</Text>
            {error &&
                <Notification
                    toast
                    status="critical"
                    title={error.errorCode.toString()}
                    message={error.errorMessage}
                    onClose={() => setError(undefined)}
                />
            }
        </Box>
    )
}

export default LoginPage

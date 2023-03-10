import React, {useState} from "react"
import {Box, Button, Form, FormField, Heading, Text, TextInput,} from "grommet"
import {Hide, View} from "grommet-icons"
import {login, LoginCredentials} from "../../api/base/login"

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState(undefined)
    const [revealPassword, setRevealPassword] = useState(false)

    const handleSubmit = ({value}: { value: LoginCredentials }) => {
        login({username: value.username, password: value.password})
            .then((response) => setResponse(response))
            .catch(() => setResponse(response))
        console.log(`Email: ${value.username}, Password: ${value.password}`)
        // Add your login logic here
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
                        type={revealPassword ? "text" : "password"}
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
            <Text>{response}</Text>
        </Box>
    )
}

export default LoginPage

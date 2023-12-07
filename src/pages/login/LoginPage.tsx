import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  TextInput,
  Notification
} from 'grommet'
import { type Credentials } from '../../api/models'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { user, onLogin, error, resetError } = useContext(AuthContext)

  const handleSubmit = ({ value }: { value: Credentials }): void => {
    setIsLoading(true)
    onLogin?.(value)
  }

  useEffect(() => {
    if (user !== undefined || error !== undefined) {
      setIsLoading(false)
    }
  }, [user, error])

  return (
    <Box align="center" pad="large">
      <Heading level={2}>Login</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField label="Username" name="username">
          <TextInput
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            required
          />
        </FormField>
        <FormField label="Password" name="password">
          <TextInput
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            required
          />
        </FormField>
        <Box direction="row" justify="center" margin={{ top: 'medium' }}>
          <Button
            type="submit"
            label="Login"
            primary
            fill="horizontal"
            busy={isLoading}
          />
        </Box>
      </Form>
      {error !== null && error !== undefined && (
        <Notification
          toast
          status="critical"
          title={error.statusCode.toString()}
          message={error.message}
          onClose={() => resetError}
        />
      )}
    </Box>
  )
}

export default LoginPage

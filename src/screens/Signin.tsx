import { useState } from "react"
import auth from '@react-native-firebase/auth'
import { VStack, Heading, Icon, useTheme } from "native-base"
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg'
import { Input } from "../components/Input"

import { Button } from "../components/Button"
import { Alert } from "react-native"

export const SignIn = () => {

  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e senha')
    }

    setIsLoading(true)

    auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code)
        setIsLoading(false)

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Login', 'Usuário não cadastrado')
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Login', 'E-mail ou senha inválidos')
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail ou senha inválidos')
        }

        return Alert.alert('Login', 'Não foi possivel acessar, contatar administrador/responsável')

      })

  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />

    </VStack>
  )
}
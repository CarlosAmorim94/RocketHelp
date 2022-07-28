import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {

  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registro', 'Preencha todos os campos')
    }

    setIsLoading(true)

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp() //Data e hora fornecidos pelo firebase
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso!')
        navigation.goBack()
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert('Solicitação', 'Não foi possivel registar o pedido, tente novamente ou entre em contato com o adminstrador.')
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder='Numero do patrimônio'
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />

    </VStack>
  );
}
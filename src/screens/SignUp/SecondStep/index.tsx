import React, { useState } from 'react';
import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from './styles';
import { BackButton } from '../../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../../routes/app.tab.routes';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: number;
  }
}

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation = useNavigation<StackParamList>();
  const routes = useRoute();
  const { user } = routes.params as Params;

  console.log(user)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleNextStep() {
    if(!password) {
      return Alert.alert("Opa", "Informe a senha e a confirmação")
    }

    if(!password) {
      return Alert.alert("Opa", "As senhas não são iguais")
    }

    await api.post("/users", {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate("Confirmation", {
        title: "Conta Criada!",
        message: "Agora é só fazer login\ne aproveitar sua conta",
        nextScreenRoute: "SignIn"
      })
    })
    .catch((error) => {
      console.log(error)
      return Alert.alert("Opa", "Não foi possível cadastrar")
    })

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
              <BackButton onPress={() => navigation.navigate("SignUp")} />
            <Steps>
              <Bullet  />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <Input
              iconName='lock'
              placeholder='Senha'
              changePasswordVisibilityButton
              onChangeText={setPassword}
              value={password}
            />

            <Input
              iconName='lock'
              placeholder='Confirme a senha'
              changePasswordVisibilityButton
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>

          <Button
            title='Cadastrar'
            onPress={handleNextStep}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

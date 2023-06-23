import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';

import { Footer, Container, Header, SubTitle, Title, Form } from './styles';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.tab.routes';
import { useAuth } from '../../hooks/auth';


export function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation<StackParamList>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string()
          .required("A senha é obrigatória")
      });

      await schema.validate({ email, password });

      await signIn({
        email,
        password
      });

    } catch (error) {
      console.log(error);
      if(error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      } else {
        return Alert.alert("Erro na autenticação", "Ocorreu um erro ao fazer login, verifique as credênciais");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle='dark-content'
          backgroundColor="transparent"
          translucent
        />

        <Header>
          <Title>
            Estamos{"\n"}
            quase lá
          </Title>

          <SubTitle>
            Faça seu login para começar {"\n"}
            uma experiência incrível
          </SubTitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
            value={email}
          />
          <Input
            iconName="lock"
            placeholder="*******"
            changePasswordVisibilityButton
            onChangeText={setPassword}
            value={password}
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            onPress={handleSignIn}
            enable={!loading}
            loading={loading}
          />

          <Button
            light
            color={theme.colors.background_secondary}
            title="Criar conta gratuita"
            onPress={() => navigation.navigate("SignUp")}
            enable={!loading}
            loading={loading}
          />
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

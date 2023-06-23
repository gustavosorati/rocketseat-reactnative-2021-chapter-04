import React, { useState } from 'react';
import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from './styles';
import { BackButton } from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../../routes/app.tab.routes';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { Alert } from 'react-native';

export function SignUp() {
  const navigation = useNavigation<StackParamList>();

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.number()
          .required("A CNH é obrigatória"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("O E-mail é obrigatório"),
        name: Yup.string()
          .required("O nome é obrigatório")
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: {
        name,
        email,
        driverLicense
      } });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState(null);

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
              <BackButton onPress={() => navigation.navigate("SignIn")} />
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={value => setDriverLicense(Number(value))}
              value={String(driverLicense)}
            />
          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

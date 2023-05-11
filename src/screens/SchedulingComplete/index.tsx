import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar, useWindowDimensions } from 'react-native';

import { Container, Content, Title, Message, Footer } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StackParamList } from '../../routes/stack.routes';
import { useNavigation } from '@react-navigation/native';


export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<StackParamList>();

  async function handleConfirm() {
    navigation.navigate("Home")
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent"/>

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>

        <Message>
          Agora você precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton title='ok' onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}

import React from 'react';
import { useTheme } from 'styled-components';
import { StatusBar, useWindowDimensions } from 'react-native';

import { Container, Content, Title, Message, Footer } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StackParamList } from '../../routes/app.tab.routes';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: any;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const routes = useRoute();
  const {title, message, nextScreenRoute} = routes.params as Params;
  const navigation = useNavigation<StackParamList>();

  async function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent"/>

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>

        <Footer>
          <ConfirmButton title='ok' onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}

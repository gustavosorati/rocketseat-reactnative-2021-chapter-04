import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface  ButtonProps extends RectButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;

  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.main};

  padding: 19px;
  margin-bottom: 8px;

  background-color: ${({color}) => color};
`;

interface ButtonTextProps {
  light: boolean;
}

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme, light}) => light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;


`;

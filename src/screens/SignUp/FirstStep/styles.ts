import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight()}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 60px;
  margin-bottom: 16px;

  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.title};
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
`;

export const Form = styled.View`
  margin-top: 60px;
  margin-bottom: 16px;
  width: 100%;
`;

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.secondary_600};margin-bottom: 24px;
`;

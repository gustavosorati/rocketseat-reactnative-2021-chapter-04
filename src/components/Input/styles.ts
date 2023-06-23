import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  gap: 2px;
  flex-direction: row;
  align-items: center;

  border-bottom-width: 4px;
  border-bottom-color: ${({isFocused, theme}) => isFocused ? theme.colors.main : "transparent"};
`;

export const IconContainer = styled.View`
  height: 56px;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  height: 56px;
  background-color: ${({theme}) => theme.colors.background_secondary};
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
`


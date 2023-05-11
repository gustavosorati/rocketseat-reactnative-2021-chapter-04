import React from 'react';
import { Container } from './styles';
import { Feather } from '@expo/vector-icons'

import { Calendar as CustomCalendar, DateData, LocaleConfig } from 'react-native-calendars'
import { useTheme } from 'styled-components';
import { ptBr } from './locale-config';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = "pt-br"

export interface MarkeDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface CalendarProps {
  markedDates: MarkeDateProps;
  onDayPress: (date: DateData) => void;
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const {fonts, colors} = useTheme();

  return (
    <Container>
      <CustomCalendar
        renderArrow={(direction) =>
          <Feather
            size={24}
            color={colors.text}
            name={direction === "left" ? "chevron-left": "chevron-right"}
          />
        }
        headerStyle={{
          backgroundColor: colors.background_secondary,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.text_detail,
          paddingBottom: 10,
          marginBottom: 10
        }}
        theme={{
          textDayFontFamily: fonts.primary_400,
          textDayHeaderFontFamily: fonts.primary_500,
          textDayHeaderFontSize: 10,
          textMonthFontSize: 20,
          textMonthFontFamily: fonts.secondary_600,
          monthTextColor: colors.title,
          arrowStyle: {
            marginHorizontal: -15
          }
        }}
        firstDay={1}
        minDate={new Date().toString()}
        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
    </Container>
  );
}

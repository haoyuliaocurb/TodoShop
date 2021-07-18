// import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

export const styledVariables = {
  color: {
    gray100: '#f2f2f2',
    gray200: '#dddddd',
    gray300: '#575757',
    gray700: '#000000',
    pink100: '#ffe8ee≈',
    pink400: '#fb457b',
    white: 'white',
  },
  shared: {
    barHeight: '50px',
    contentPadding: '2%',
    contentMaxWidth: '800px',
    contentTabBarMaxWidth: '700px',
  },
  app: {},
  tabBar: {
    iconWidth: '23px',
  },
  navBar: {
    iconWidth: '30px',
    buttonWidth: '40px',
  },
  todolistTable: {
    itemButtonWidth: '85px',
    selfPaddingTop: '10px',
    iconWidth: '20px',
  },
  todolist: {
    itemHeight: '30px',
    itemMargin: '10px',
  },
  todolistPages: {
    breakpoint: '800',
  },
  EasySearchMode: {
    SearchItem: {
      TitleHeight: '25px',
      SelfPaddingHor: '10px',
    },
    SearchCard: {
      SelfPaddingBottom: '6px',
      SelfMarginRight: '10px',
      SelfWidth: '116px',
    },
  },
  NormalSearchMode: {
    SearchCard: {
      SelfPaddingBottom: '26px',
      SelfPaddingHor: '18px',
    },
  },
};

// eslint-disable-next-line consistent-return
const getIconColor = (disabled, active) => {
  if (disabled) {
    return '#dfdfdf';
  }
  if (active) {
    return styledVariables.color.pink400;
  }
  if (!active) {
    return styledVariables.color.gray300;
  }
};

export const styledCSS = {
  iconColorState: ({ disabled, active }) => css`
    display: inline-block;
    width: 100%;
    height: 100%;

    path {
      fill: ${getIconColor(disabled, active)};
    }

    // for <circle>, <rect> ... element in <svg>
    * {
      fill: ${getIconColor(disabled, active)};
    }

    > p.textIcon {
      color: ${getIconColor(disabled, active)};
    }
  `,
};

export const getRGBFromColorCode = (colorCode) => {
  const colorCodeArray = colorCode.split();
  colorCodeArray.shift();
  const red = `${colorCodeArray[0]}${colorCodeArray[1]}`;
  const green = `${colorCodeArray[2]}${colorCodeArray[3]}`;
  const blue = `${colorCodeArray[4]}${colorCodeArray[5]}`;
  return { red, green, blue };
};

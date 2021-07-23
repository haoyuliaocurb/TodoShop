// import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

export function removePx(originValue) {
  const pxPattern = /px$/i;
  if (typeof originValue === 'number') {
    return originValue;
  }

  if (!pxPattern.test(originValue)) {
    return originValue;
  }

  const charArray = originValue.split('');
  // 兩次 pop() 把 px 去掉
  charArray.pop();
  charArray.pop();
  // console.log(charArray);
  const revisedValue = Number(charArray.join(''));
  // console.log('revisedValue: ', revisedValue);

  return revisedValue;
}

export const styledVariables = {
  color: {
    gray100: '#f2f2f2',
    gray200: '#dddddd',
    gray300: '#575757',
    gray700: '#000000',
    pink100: '#ffe8ee',
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
    iconWidth: '24px',
    buttonWidth: '40px',
  },
  todolistTable: {
    selectTableItemButtonWidth: '35px',
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
styledVariables.todolistTable.buttonWidthSum = `${
  removePx(styledVariables.todolistTable.selectTableItemButtonWidth) +
  removePx(styledVariables.todolistTable.itemButtonWidth)
}px`;

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

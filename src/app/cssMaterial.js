import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

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
  },
  app: {
  },
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
  }
}

export const styledCSS = {
  iconColorState: props => css`
    display: inline-block;
    width: 100%;
    height: 100%;

    path {
      fill: ${props.disabled ? "'#dfdfdf'" : (props.active ? styledVariables.color.pink400 : styledVariables.color.gray300)};
    }

    // for <circle>, <rect> ... element in <svg>
    * {
      fill: ${props.disabled ? "'#dfdfdf'" : (props.active ? styledVariables.color.pink400 : styledVariables.color.gray300)};
    }

    > p.textIcon {
      color: ${props.disabled ? "'#dfdfdf'" : (props.active ? styledVariables.color.pink400 : styledVariables.color.gray300)};
    }
  `,
}

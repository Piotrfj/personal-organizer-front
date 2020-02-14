import { css } from 'styled-components';

export const defaultThemeStyles = () => css`
  color: ${props => props.theme.paletteBlue.text2};
`;

export const boxShadow = () => css`
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, .2);
`;

export const hrBetween = () => css`
    &:nth-of-type(n+2) {
    position: relative;
    margin-top: .6rem;    
      &:before {
        position: absolute;
        top: -.3rem;
        left: 1rem;
        right: 1rem;
        height: 1px;
        content: '';
        background-color: ${props => props.theme.paletteBlue.text1};
      }
    }
`;

export const hrTop = (distance = '.6rem', pseudoElem = 'before') => css`
  &:${pseudoElem} {
    position: absolute;
    top: calc(-${distance}/2);
    left: 1rem;
    right: 1rem;
    height: 1px;
    content: '';
    background-color: ${props => props.theme.paletteBlue.text1};
  }
`;

export const hrBottom = (distance = '.6rem', pseudoElem = 'before') => css`
  &:${pseudoElem} {
    position: absolute;
    bottom: calc(-${distance}/2);
    left: 1rem;
    right: 1rem;
    height: 1px;
    content: '';
    background-color: ${props => props.theme.paletteBlue.text1};
  }
`;

export const hrAround = (distance = '.6rem') => css`
  position: relative;
  margin-bottom: ${distance};  
  ${hrBottom(distance, 'after')}
  &:first-of-type {
    margin-top: ${distance};    
      ${hrTop(distance)};
    }
`;

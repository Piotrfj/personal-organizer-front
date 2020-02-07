import { css } from 'styled-components';

export const boxShadow = () => css`
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, .2);
`;

export const hrBetween = () => css`
    &:nth-child(n+2) {
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
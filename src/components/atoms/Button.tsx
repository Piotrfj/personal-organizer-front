import styled from 'styled-components';

export const BaseButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  font-family: 'Monserrat', 'Roboto', 'Arial', sans-serif;
  color: ${({theme}) => theme.paletteBlue.text3};
  &:hover {
  color: ${({theme}) => theme.paletteBlue.text4};
  }
`;

const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  padding: 10px 25px;
  background-color: ${({theme}) => theme.paletteBlue.main};
  border-radius: 8px;
  text-transform: uppercase;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, .2);
`;

export const ConvexButton = styled(Button)`
  border-radius: 10px;
  background: linear-gradient(145deg, #2a577b, #326893);
  box-shadow:  4px 4px 10px rgba(0, 0, 0, .15), 
             -2px -2px 10px rgba(255, 255, 255, .1);
  &:hover {
    background: linear-gradient(145deg, #30648e, #3875a6);
  }
`;

export default Button;

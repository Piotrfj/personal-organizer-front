import styled from 'styled-components';

export const BaseButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  font-family: 'Monserrat', 'Roboto', 'Arial', sans-serif;
  color: ${({theme}) => theme.paletteBlue.text4};
`;

const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  padding: 10px 25px;
  background-color: ${({theme}) => theme.paletteBlue.main};
  border-radius: 8px;
  text-transform: uppercase;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, .2);
  &:hover {
    
  }
`;

export default Button;

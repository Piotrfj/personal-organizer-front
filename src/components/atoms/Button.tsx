import styled from 'styled-components';

export const BaseButton = styled.button`
  outline: none;
  cursor: pointer;
`;

const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  padding: 8px 25px;
  border: 2px solid black;
  background-color: ${({bgc}) => bgc || 'grey'};
  font-family: 'Monserrat', 'Roboto', 'Arial', sans-serif;
  border-radius: 16px;
`;

export default Button;

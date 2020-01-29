import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 8px 25px;
  border: 2px solid black;
  background-color: ${({bgc}) => bgc || 'grey'};
  font-family: 'Monserrat', 'Roboto', 'Arial', sans-serif;
  border-radius: 16px;
  &:hover {
  cursor: pointer;
  }
`;

export default Button;
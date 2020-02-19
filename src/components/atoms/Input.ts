import styled from 'styled-components';

const Input = styled.input`
  padding: 12px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 20px;
  
  :focus {
  outline: none;
  }
  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.paletteBlue.text1};
  }
`;

export default Input;

import React from 'react';
import SideNavBar from '../organisms/SideNavBar';
import styled from 'styled-components';
import { defaultThemeStyles } from '../../theme/mixins';
import LogInForm from '../molecules/LogInForm';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100%;
  background-color: ${({theme}) => theme.paletteBlue.bgc};
  height: 100vh;
  ${defaultThemeStyles()};
`;

const GridTemplate = ({children}) => {
    return (
        <StyledWrapper>
          <SideNavBar/>
          {children}
          <LogInForm/>
        </StyledWrapper>
    );
};

export default GridTemplate;

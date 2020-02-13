import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BaseButton } from '../atoms/Button';
import { hrAround } from '../../theme/mixins';

const Wrapper = styled.div`
  border-right: 10px solid ${props => props.theme.paletteBlue.text3};
`;

const LogoWrapper = styled.div`
  display: grid;
  grid-row-gap: 5px;
  padding: 15px 10px 0 10px;
  margin-bottom: 50px;
`;

const LogoText = styled.h2`
  font-size: 2.6rem;
  letter-spacing: 1px;
  color: ${props => props.theme.paletteBlue.secondary};
`;

const LinkButton = styled(BaseButton)`
  display: block;
  padding: 10px 0 10px 30px;
  
  font-size: 2rem;
  color: ${props => props.theme.paletteBlue.text2};
  text-decoration: none;
  
  &:link, &:active, &:visited {
  color: ${props => props.theme.paletteBlue.text2};
  }
  &:hover {
    background-color: ${props => props.theme.paletteBlue.text1};
    color: ${props => props.theme.paletteBlue.text3};
  }
  &.active {
    font-weight: bold;
    padding-left: 40px;
    color: ${props => props.theme.paletteBlue.text3};
  }
  ${hrAround('0rem')};
`;

class SideNavBar extends Component {
  render() {
    return (
        <Wrapper>
          <LogoWrapper>
            <LogoText>Personal</LogoText>
            <LogoText>Organizer</LogoText>
          </LogoWrapper>
          <LinkButton as={NavLink} to="/habits" activeClass="active">Habits</LinkButton>
        </Wrapper>
    );
  }
}

export default SideNavBar;

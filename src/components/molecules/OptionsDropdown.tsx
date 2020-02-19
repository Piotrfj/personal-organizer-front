import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled, {css} from 'styled-components';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {BaseButton} from "../atoms/Button";
import {hrBetween} from "../../theme/mixins";


const Wrapper = styled.div`
  position: absolute;
  top: .5rem;
  right: .5rem;
  width: 120px;
  height: 100px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 1rem;
  right: 2.2rem;
  min-width: 80px;
  
  border-radius: 13px;
  background: linear-gradient(145deg, #21547e, #19476d);
  box-shadow:  5px 5px 10px rgba(0, 0, 0, .2), 
             -2px -2px 10px rgba(255, 255, 255, .1);
`;

const DropdownItem = styled(BaseButton)`
  display: block;
  width: 100%;
  padding: .5rem 1rem;
  background-color: transparent;
  ${hrBetween()};
  ${({disabled, theme}) => disabled && css`
  color: ${theme.paletteBlue.text2}!important;
`}
  &:hover {
    color: ${({theme}) => theme.paletteBlue.text4};
  }
`;

const EllipsisButton = styled(FontAwesomeIcon)`
  width: 20px!important;
  height: 20px;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 30px;
  height: 30px;
  border-radius: 50%;
  
  &:hover{
    color: ${({theme}) => theme.paletteBlue.bright};
  }
`;

interface OptionsDropdownState {
    isDropdownOpen: boolean
}

interface OptionsDropdownProps {
    actions: { name: string, cb: () => void, disabled?: boolean }[]
}

class OptionsDropdown extends Component<OptionsDropdownProps, OptionsDropdownState> {

    state = {
        isDropdownOpen: false
    };

    handleActionClick = (cb) => () => {
        this.toggleDropdown();
        cb();
    };

    render() {
        return (
            <Wrapper onMouseLeave={this.closeDropdown}>
                <IconButtonWrapper>
                    <EllipsisButton onClick={this.toggleDropdown} icon={faEllipsisV}/>
                </IconButtonWrapper>
                {this.state.isDropdownOpen &&
                <DropdownWrapper >
                    {this.props.actions.map(action => <DropdownItem disabled={action.disabled ? true : false}
                                                                    key={action.name}
                                                                    onClick={this.handleActionClick(action.cb)}>{action.name}</DropdownItem>)}
                </DropdownWrapper>}
            </Wrapper>
        );
    }

    toggleDropdown = () => {
        this.setState(prevState => ({isDropdownOpen: !prevState.isDropdownOpen}))
    };

    closeDropdown = () => {
        this.setState({isDropdownOpen: false});
    };
}

export default OptionsDropdown;
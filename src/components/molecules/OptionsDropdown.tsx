import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import {BaseButton} from "../atoms/Button";
import {boxShadow, hrBetween} from "../../theme/mixins";


const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: .5rem;
  right: 2rem;
  min-width: 80px;
  border: 1px solid black;
  background-color: ${props => props.theme.paletteBlue.secondary};
  ${boxShadow()};
`;

const DropdownItem = styled(BaseButton)`
  display: block;
  width: 100%;
  padding: .5rem 1rem;
  background-color: transparent;
  ${hrBetween()};
`;

const EllipsisButton = styled(FontAwesomeIcon)`
  width: 25px!important;
  height: 25px;
`;

interface OptionsDropdownState {
    isDropdownOpen: boolean
}

interface OptionsDropdownProps {
    actions: {name: string, cb: () => void, disabled?: boolean}[]
}

class OptionsDropdown extends Component<OptionsDropdownProps, OptionsDropdownState> {

    state = {
      isDropdownOpen: false
    };

    handleActionClick = (cb) => () => {
        this.toggleDropdown();
        cb();
    };

    handleMouseLeave = () => {
        //this.closeDropdown();
    };

    render() {
        return (
            <Wrapper onMouseLeave={this.handleMouseLeave}>
                <EllipsisButton onClick={this.toggleDropdown} icon={faEllipsisV} />
                {this.state.isDropdownOpen &&
                <DropdownWrapper>
                    {this.props.actions.map(action => <DropdownItem disabled={action.disabled ? true : false} key={action.name} onClick={this.handleActionClick(action.cb)}>{action.name}</DropdownItem>)}
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
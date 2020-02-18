import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import styled from 'styled-components'
import LogInForm from "../../components/molecules/LogInForm";

interface HabitDetailsProps {
}

const Wrapper = styled.div`
  padding: 20px 10px 0 0;
`;

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <Wrapper>
                <Calendar/>
                <LogInForm/>
            </Wrapper>
        );
    }
}

export default HabitDetails;

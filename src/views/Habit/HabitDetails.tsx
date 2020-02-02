import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import styled from 'styled-components'

interface HabitDetailsProps {
}

const Wrapper = styled.div`

`;

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <Wrapper>
                <Calendar/>
            </Wrapper>
        );
    }
}

export default HabitDetails;

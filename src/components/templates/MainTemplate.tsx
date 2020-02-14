import React, {Component} from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import {theme} from 'theme/mainTheme';
import {ThemeProvider} from 'styled-components';
import GridTemplate from './GridTemplate';

class MainTemplate extends Component {
    render() {
        const {children} = this.props;
        return (
            <>
                <GlobalStyle/>
                <ThemeProvider theme={theme}>
                  <GridTemplate>
                    {children}
                  </GridTemplate>
                </ThemeProvider>
            </>
        );
    }
}

export default MainTemplate;

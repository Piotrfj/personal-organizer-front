import React, {Component} from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import {theme} from 'theme/mainTheme';
import {ThemeProvider} from 'styled-components';

class MainTemplate extends Component {
    render() {
        const {children} = this.props;
        return (
            <div>
                <GlobalStyle/>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </div>
        );
    }
}

export default MainTemplate;
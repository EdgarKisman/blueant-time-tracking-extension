import React, {PropsWithChildren, useContext, useState} from 'react';
import {
    Grommet,
    grommet,
    Header,
    Text,
    Page,
    PageContent,
    PageHeader,
    Button,
    Box,
    ResponsiveContext,
} from 'grommet';
import {Moon, Sun} from "grommet-icons";
import {deepMerge} from "grommet/utils"
import LoginPage from "./pages/login/LoginPage";

const theme = deepMerge(grommet, {
    global: {
        colors: {
            brand: "rgba(0,100,163,0.75)"
        },
        font: {
            family: "Roboto",
            size: "18px",
            height: "20px",
        },
    },
});

const AppBar = (props: PropsWithChildren) => (
    <Header
        background="brand"
        pad={{left: "medium", right: "small", vertical: "small"}}
        elevation="medium"
        {...props}
    />
)

const App = () => {
    const [darkMode, setDarkMode] = useState(false)
    const size = useContext(ResponsiveContext);
    return (
        <Grommet theme={theme} full themeMode={darkMode ? "dark" : "light"}>
            <Page>
                <AppBar>
                    <Text size="large">BlueAnt Time Tracker</Text>
                    <Button
                        icon={darkMode ? <Moon/> : <Sun/>}
                        onClick={() => setDarkMode(!darkMode)}
                        tip={{
                         content: (
                             <Box pad="small" round="small" background={darkMode ? "dark-1" : "light-3"}>
                                 {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                             </Box>
                         )
                        }}
                    />
                </AppBar>
                <PageContent>
                    <LoginPage/>
                </PageContent>
            </Page>
        </Grommet>
    );
}

export default App;

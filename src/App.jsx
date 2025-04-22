import {
  MyRoutes,
  Sidebar,
  Device,
  Light,
  Dark,
  AuthContextProvider,
  MenuAmbur,
} from "./index";
import styled from "styled-components";
import { createContext, useState } from "react";

import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("Light");
  const themeStyle = theme === "Light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={(setTheme, theme)}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <Container className={sidebarOpen ? " active" : ""}>
              <div className="contentSidebar">
                <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
              </div>
              <div className="contentMenuAmbur">
                <MenuAmbur />
              </div>
              <Containerbody>
                <MyRoutes />
              </Containerbody>
            </Container>
            {/* <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools> */}
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: 0.3 ease-in-out;
  .contentSidebar {
    display: none;
  }
  .contentMenuAmbur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 67px 1fr;
    .contentSidebar {
      display: initial;
    }
    .contentMenuAmbur {
      display: none;
    }
    &.active {
      grid-template-columns: 222px 1fr;
    }
  }
`;

const Containerbody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;

export default App;

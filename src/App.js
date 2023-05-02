import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "@mui/material";
import { NotificationContainer } from "react-notifications";
import AppLayout from "./compenents/AppLayout/AppLayout";
import { UserProvider } from "./context/user-context";
import "react-notifications/lib/notifications.css";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <UserProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Container className="page-container">
            <Router>
              <AppLayout />
              <NotificationContainer />
            </Router>
          </Container>
        </Suspense>
      </UserProvider>
    </StyledEngineProvider>
  );
}

export default App;

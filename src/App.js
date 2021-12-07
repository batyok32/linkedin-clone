import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import { authRoutes, companyRoutes, mainRoutes } from "./routes";
import WithLoged from "./hocs/withLoged";
import OnlyCompany from "./hocs/onlyCompany";

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                {/* <Router basename={"/linkedin-frontend"}> */}
                <Switch>
                    {companyRoutes.map((route) => (
                        <Route {...route}>
                            <OnlyCompany>
                                <MainLayout>{route.comp}</MainLayout>
                            </OnlyCompany>
                        </Route>
                    ))}
                    {authRoutes.map((route) => (
                        <Route {...route}>
                            <WithLoged>
                                <AuthLayout>{route.comp}</AuthLayout>
                            </WithLoged>
                        </Route>
                    ))}
                    {mainRoutes.map((route) => (
                        <Route {...route}>
                            <MainLayout>{route.comp}</MainLayout>
                        </Route>
                    ))}
                    <Route
                        path="/admin"
                        component={() => {
                            window.location.href =
                                "https://linkedinclone.pythonanywhere.com/admin";
                            return null;
                        }}
                    />
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;

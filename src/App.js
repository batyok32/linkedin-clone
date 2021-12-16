import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import {
    authRoutes,
    companyRoutes,
    freelancerRoutes,
    mainRoutes,
} from "./routes";
import WithLoged from "./hocs/withLoged";
import OnlyCompany from "./hocs/onlyCompany";
import { useDispatch } from "react-redux";
import { checkAuthenticated, load_user } from "./redux/actions/auth";
import OnlyFreelancer from "./hocs/onlyFreelancer";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthenticated()).then((res) => {
            if (res === 200) {
                dispatch(load_user());
            }
        });
    }, []);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* <Router> */}
            <Router>
                <Switch>
                    {companyRoutes.map((route) => (
                        <Route {...route}>
                            <OnlyCompany>
                                <MainLayout>{route.comp}</MainLayout>
                            </OnlyCompany>
                        </Route>
                    ))}
                    {freelancerRoutes.map((route) => (
                        <Route {...route}>
                            <OnlyFreelancer>
                                <MainLayout>{route.comp}</MainLayout>
                            </OnlyFreelancer>
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

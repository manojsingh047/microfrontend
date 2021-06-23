
import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Navigate, Route, Switch } from "react-router-dom";
import { ServiceProvider } from "../../context/Service";
import { useLocalStorageSync } from "../../hooks/useLocalStorageSync";
import AppBar from "../app-bar/AppBar";
import AppDrawer from "../app-drawer/AppDrawer";
import Viewport from "../viewport/Viewport";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "../logout/Logout";

// const DashboardService = React.lazy(() => import("dashboard/DashboardService"));
const OrderService = React.lazy(() => import("order/OrderService"));
// const ProfilePage = React.lazy(() => import("profile/ProfilePage"));

function useDrawer() {
    const { value, setItem } = useLocalStorageSync(
        "@shared-routing/appdrawer/open"
    );

    return {
        open: value,
        closeDrawer() {
            setItem(false);
        },
        openDrawer() {
            setItem(true);
        },
    };
}

export default function Shell() {
    const drawer = useDrawer();

    return (
        <Auth0Provider
            domain="dev-js14yx82.us.auth0.com"
            clientId="wxcha8zQKa5YsdKxMftOnhFkd9OYnvlG"
            redirectUri={window.location.origin}
        >
            <ServiceProvider>
                <BrowserRouter>
                    <Viewport>
                        <Box display="flex" flex={1}>
                            <AppBar drawer={drawer} />
                            <AppDrawer drawer={drawer} />
                            <React.Suspense fallback={"Loading"}>
                                <Switch>
                                    {/* <Route path="/dashboard" component={DashboardService} /> */}
                                    <Route path="/orders" component={OrderService} />
                                    <Route path="/logout" component={Logout} />
                                    {/* <Route path="/profile" component={ProfilePage} /> */}
                                </Switch>
                            </React.Suspense>
                        </Box>
                    </Viewport>
                </BrowserRouter>
            </ServiceProvider>
        </Auth0Provider>
    );
}
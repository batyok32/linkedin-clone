import React from "react";
import Freelancers from "./containers/Freelancers";
import Jobs from "./containers/Jobs";
import Login from "./containers/Login";
import PostJob from "./containers/PostJob";
const Home = React.lazy(() => import("./containers/Home"));
const SignUp = React.lazy(() => import("./containers/SignUp"));

export const mainRoutes = [
    {
        path: "/freelancers",
        comp: <Freelancers />,
    },

    {
        path: "/jobs/:job_slug/:job_id/",
        comp: <Jobs />,
    },
    {
        path: "/jobs",
        comp: <Jobs />,
    },

    {
        path: "/",
        comp: <Home />,
    },
];

export const authRoutes = [
    {
        path: "/signup",
        comp: <SignUp />,
    },
    {
        path: "/login",
        comp: <Login />,
    },
];
export const companyRoutes = [
    {
        path: "/jobs/post",
        comp: <PostJob />,
        exact: true,
    },
];

// 2. Retrieve Freelancer
// 3. Retrieve Company

// 4. Update Company Profile
// 5. Update Freelancer Profile

// 6. Admin

// 4. I must update access token if its expired
// Make access token time to 2 hours
// After that if request ends in token_not_valid refresh_token
// If request ends refresh_token_not_valid log out user

// 5. Make search with ElasticSearch

// 6. Make Contact page where it sends email to admins

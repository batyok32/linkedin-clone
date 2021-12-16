import React from "react";
import EditCompany from "./containers/EditCompany";
import EditFreelancer from "./containers/EditFreelancer";
import Freelancers from "./containers/Freelancers";
import Jobs from "./containers/Jobs";
import Login from "./containers/Login";
import PostJob from "./containers/PostJob";
import RetrieveCompany from "./containers/RetrieveCompany";
const Home = React.lazy(() => import("./containers/Home"));
const SignUp = React.lazy(() => import("./containers/SignUp"));

export const mainRoutes = [
    {
        path: "/freelancers",
        comp: <Freelancers />,
    },
    {
        path: "/company/:slug/:id",
        comp: <RetrieveCompany />,
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
    {
        path: "/edit/company/profile",
        comp: <EditCompany />,
        exact: true,
    },
];

export const freelancerRoutes = [
    {
        path: "/edit/freelancer/profile",
        comp: <EditFreelancer />,
        exact: true,
    },
];

// 5. Update Freelancer Profile
// 7. Company Jobs list, retreive, update, delete

// 6. Admin

// 4. I must update access token if its expired
// Make access token time to 2 hours
// After that if request ends in token_not_valid refresh_token
// If request ends refresh_token_not_valid log out user

// 5. Make search with ElasticSearch

// 6. Make Contact page where it sends email to admins

import React from "react";
import JoinUs from "../components/Home/JoinUs";
import Options from "../components/Home/Options";
import Slider from "../components/Home/Slider/Slider";
import Works from "../components/Home/Works";

function Home() {
    return (
        <>
            <Slider />
            <Options />
            {/* <Works /> */}
            <JoinUs />
        </>
    );
}

export default Home;

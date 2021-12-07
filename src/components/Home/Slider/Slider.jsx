import React, { useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, {
    Pagination,
    Navigation,
    Keyboard,
    Autoplay,
    Zoom,
} from "swiper";

import { imageOptions } from "./sliderOptions";
import { items } from "./sliderData";
import { Link } from "react-router-dom";
import LoadingSlider from "./LoadingSlider";

SwiperCore.use([Navigation, Pagination, Autoplay, Keyboard, Zoom]);

function Slider() {
    // const [items, setItems] = useState([]);
    return (
        <Swiper
            {...imageOptions}
            className="image-slider"
            navigation={{
                nextEl: ".bi .bi-arrow-right-circle",
                prevEl: ".bi .bi-arrow-left-circle",
            }}
        >
            {Array.isArray(items) && items.length >= 1 ? (
                items.map((item) => {
                    return (
                        <SwiperSlide key={item.alt}>
                            <Link to={item.link}>
                                <div
                                    className="slider-image"
                                    style={{
                                        backgroundImage: `url(${item.src})`,
                                    }}
                                ></div>
                            </Link>
                        </SwiperSlide>
                    );
                })
            ) : (
                <LoadingSlider />
            )}
        </Swiper>
    );
}

export default Slider;

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../Banner/Banner.css"

const ResizePlugin = (slider) => {
    const observer = new ResizeObserver(function () {
        slider.update();
    });

    slider.on("created", () => {
        observer.observe(slider.container);
    });
    slider.on("destroyed", () => {
        observer.unobserve(slider.container);
    });
};

const Banner = () => {
    const banners = [
        {
            image:
                "https://i.ibb.co/V3D7XV9/premium-photo-1680807869780-e0876a6f3cd5.jpg",
            megaOffer: false,
            offerDate: "",
            __v: 0,
        },
        {
            image:
                "https://i.ibb.co/ySvXtVS/istockphoto-1343547238-2048x2048.jpg",
            megaOffer: true,
            offerDate: "",
            __v: 0,
        },
        {
            image:
                "https://i.ibb.co/Ypf6RYY/istockphoto-656378092-2048x2048.jpg",
            megaOffer: true,
            offerDate: "",
            __v: 0,
        },
        {
            image:
                "https://i.ibb.co/6RfhqYs/photo-1499750310107-5fef28a66643.jpg",
            megaOffer: true,
            offerDate: "",
            __v: 0,
        },
    ];
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            loop: true,
            initial: 0,
            slides: {
                perView: 1,
                spacing: 20,
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true);
            },
        },
        [
            ResizePlugin,
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 5000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
        ]
    );

    return (
        <div className="flex-col mt-[26px] wrapper">
            <div ref={sliderRef} className="keen-slider" style={{ width: "100%" }}>
                {Array.isArray(banners) && banners?.length > 0 && (
                    <div className="keen-slider">
                        {banners?.map((banner, index) => (
                            <div
                                key={index} // It's a good practice to provide a unique key when mapping over an array
                                style={{ backgroundImage: `url(${banner.image})` }} // Make sure to specify the URL for backgroundImage
                                className="keen-slider__slide py-20 md:py-0 md:h-[90vh] bg-no-repeat bg-cover bg-center before:content-['']
                before:absolute
                before:inset-0
                before:block
                 before:bg-[#272D2D]
                before:opacity-75
                before:z-[-5]"
                            >
                                <div className="container flex flex-col items-center justify-center w-full h-full mx-auto space-y-3">
                                    <motion.h3
                                        initial={{ opacity: 0, y: -20 }} // Initial state (hidden and 50px down)
                                        whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and at original position
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="text-2xl font-normal mt-5 tracking-wider text-white"
                                    >
                                        
                                    </motion.h3>
                                    <motion.h2
                                        initial={{ opacity: 0, y: -20 }} // Initial state (hidden and 50px down)
                                        whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and at original position
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        id="banner-heading"
                                        style={{ textFillColor: "transparent" }}
                                        className="text-2xl font-bold text-center uppercase md:text-7xl text-white"
                                    >
                                        Discover the Best in Learning and Development
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: -20 }} // Initial state (hidden and 50px down)
                                        whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and at original position
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="text-2xl font-normal tracking-wider text-white"
                                    >
                                       
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }} // Initial state (hidden and 50px down)
                                        whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and at original position
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                    >
                                        <Link to={"/shop"}>
                                            <button className="px-4 py-3 my-5 text-xs font-normal tracking-wider transition-all duration-500 border outline-none hover:bg-light hover:text-primary hover:border-transparent border-light text-white ">
                                                SHOW MORE
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {loaded && instanceRef.current && instanceRef.current.track.details && (
                <div className="flex justify-center mt-5 slider-dots">
                    {Array.from({
                        length: instanceRef.current?.details?.slides?.length || 0,
                    })?.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                            }}
                            className={"slider-dot" + (currentSlide === idx ? " active" : "")}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;
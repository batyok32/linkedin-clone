import React from "react";

function JoinUs() {
    return (
        <section
            className="d-flex big-section"
            style={{
                backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/images/big-join-us.svg"
                })`,
            }}
        >
            <div
                className="w-100  py-4"
                style={{
                    transition: "opacity 334ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <h2 className="bg-transparent container hello-big-text text-black px-4 px-md-0">
                    Присоединяйтесь к своим коллегам, однокурсникам и друзьям в
                    LinkedIn.
                </h2>
            </div>
        </section>
    );
}

export default JoinUs;

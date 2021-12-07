import React, { useState } from "react";

function JobPagination({ jobsLength, setLoadMore, isLoading }) {
    const handleLoadMore = () => {
        setLoadMore(jobsLength);
    };
    return (
        <div className="row my-5 justify-content-center">
            <button
                className="btn join-btn mx-auto py-2"
                style={{
                    width: "400px",
                    borderRadius: "30px",
                    fontWeight: 600,
                    fontSize: "16px",
                }}
                onClick={() => handleLoadMore()}
            >
                {isLoading ? (
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    "Загрузить ещё..."
                )}
            </button>
        </div>
    );
}

export default JobPagination;

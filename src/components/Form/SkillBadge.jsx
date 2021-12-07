import React from "react";

function SkillBadge({ name }) {
    return (
        <span
            className="badge rounded-pill   me-2 my-1 skillbadge"
            style={{
                padding: "0.50rem 0.80rem",
                fontSize: "14px",
                fontWeight: "500",
            }}
        >
            {name}
        </span>
    );
}

export default SkillBadge;

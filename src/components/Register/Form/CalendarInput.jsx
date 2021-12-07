import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ru } from "react-date-range/src/locale";

function CalendarInput({ name, full_name, icon, calendarDate, handleSelect }) {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <label
                htmlFor={name}
                className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                style={{ fontSize: "14px" }}
            >
                <i class={`bi ${icon} fs-5 me-2`}></i>
                {full_name}
            </label>
            <div className="d-flex justify-content-center">
                <Calendar
                    locale={ru}
                    maxDate={new Date()}
                    date={calendarDate}
                    onChange={handleSelect}
                />
            </div>
        </div>
    );
}

export default CalendarInput;

import React from "react";
import JobItem2 from "./JobItem2";

function JobsMap({ jobs, setModalItem, setClickModalItem }) {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  ">
            {Array.isArray(jobs) &&
                jobs.length >= 1 &&
                jobs.map((job) => {
                    return (
                        <JobItem2
                            clickFun={() => {
                                setModalItem(job);
                                setClickModalItem(true);
                            }}
                            key={job.id}
                            name={job.name}
                            profession={job.profession}
                            company={job.company}
                            min_salary={job?.min_salary}
                            max_salary={job?.max_salary}
                            after_meeting={job?.after_meeting}
                            city={job.city}
                            updated={job.updated}
                        />
                    );
                })}
        </div>
    );
}

export default JobsMap;

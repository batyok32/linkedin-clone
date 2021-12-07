import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterRow from "../components/Form/JobFilterRow";
import JobItem2 from "../components/Jobs/JobItem2";
import { get_profession, load_jobs } from "../redux/actions/main";
import { useParams, useLocation } from "react-router-dom";
import { selectJobs } from "../redux/selectors/main";
import { getJobsConfig } from "../utils/jobsConfig";
import JobPagination from "../components/Jobs/JobPagination";
import JobModal from "../components/Jobs/JobModal";

const mapState = (state) => ({
    jobs: selectJobs(state),
    next: state.main.next,
    count: state.main.count,
});

function Jobs() {
    // Data
    const [filterData, setFilterData] = useState({
        profession: null,
        city: null,
        company: null,
        minSalary: null,
        maxSalary: null,
        date: null,
        order: null,
    });
    // Data get Options
    const [clickedSearchBtn, setClickSearch] = useState(false);
    const [loadMore, setLoadMore] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { jobs, next, count } = useSelector(mapState);

    // Url Profession
    const [defaultProfession, setDefaultProfession] = useState(null);
    const { job_slug, job_id } = useParams();
    const dispatch = useDispatch();

    // Modal
    const openModalRef = React.createRef();
    const closeModalRef = React.createRef();
    const [modalItem, setModalItem] = useState(null);
    const [clickedModalItem, setClickModalItem] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (modalItem && clickedModalItem) {
            openModalRef.current.click();
            setClickModalItem(false);
        }
    }, [clickedModalItem]);
    useEffect(() => {
        if (modalItem && location) {
            closeModalRef.current.click();
        }
    }, [location]);

    // Get the data function
    const loadJobsFun = () => {
        setIsLoading(true);
        // Getting search configs for backend
        let config = getJobsConfig(filterData, loadMore);
        if (loadMore) {
            // If user wants next page
            dispatch(load_jobs(config, jobs)).then((res) => {
                setIsLoading(false);
                setLoadMore(null);
            });
        } else {
            dispatch(load_jobs(config)).then((res) => {
                setIsLoading(false);
            });
        }
    };

    const hasDefaultProfession = () => {
        // If it has profession in url, it gets this profession data
        dispatch(get_profession(job_id)).then((res) => {
            setDefaultProfession(res);
            setFilterData({
                ...filterData,
                profession: job_id,
            });
            setClickSearch(true);
        });
    };

    useEffect(() => {
        // First display of this page, go to top
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        // Check if url has profession
        if (job_id) {
            hasDefaultProfession();
        } else {
            loadJobsFun();
        }
    }, [job_slug, job_id]);

    useEffect(() => {
        // If search btn clicked, get the data
        if (clickedSearchBtn) {
            setClickSearch(false);
            loadJobsFun();
        }
    }, [filterData, clickedSearchBtn]);

    useEffect(() => {
        // If loadMore clicked, get the data
        if (loadMore) {
            loadJobsFun();
        }
    }, [loadMore]);

    return (
        <>
            <JobModal job={modalItem} closeModalRef={closeModalRef} />
            <div
                ref={openModalRef}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal3"
            ></div>

            <div className="container">
                <FilterRow
                    isLoading={isLoading}
                    setClickSearch={setClickSearch}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    defaultProfession={defaultProfession}
                />
                <div className="my-5">
                    <div className="h3 mb-4 text-center">
                        Работа {count ? <> - {count}</> : " - 0"}
                    </div>

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

                    {next ? (
                        <JobPagination
                            jobsLength={jobs?.length}
                            setLoadMore={setLoadMore}
                            isLoading={isLoading}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}

export default Jobs;

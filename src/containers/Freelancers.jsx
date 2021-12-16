import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterRow from "../components/Form/FreelancerFilterRow";
import FreeItem from "../components/Freelancers/FreeItem";
import FreeModal from "../components/Freelancers/FreeModal";
import JobPagination from "../components/Jobs/JobPagination";
import { load_freelancers } from "../redux/actions/main";
import { selectFreelancers } from "../redux/selectors/main";
import { getFreelancersConfig } from "../utils/jobsConfig";

const mapState = (state) => ({
    freelancers: selectFreelancers(state),
    next: state.main.freelancers_next,
    count: state.main.freelancers_count,
});

function Freelancers() {
    // Data
    const [filterData, setFilterData] = useState({
        full_name: null,
        profession: null,
        city: null,
        date: null,
        order: null,
    });
    const [clickedSearchBtn, setClickSearch] = useState(false);
    const [loadMore, setLoadMore] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { freelancers, next, count } = useSelector(mapState);

    useEffect(() => {
        // First display of this page, go to top
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        loadFreelancersFun();
    }, []);
    const loadFreelancersFun = () => {
        setIsLoading(true);
        // Getting search configs for backend
        let config = getFreelancersConfig(filterData, loadMore);
        if (loadMore) {
            // If user wants next page
            dispatch(load_freelancers(config, freelancers)).then((res) => {
                setIsLoading(false);
                setLoadMore(null);
            });
        } else {
            dispatch(load_freelancers(config)).then((res) => {
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        // If search btn clicked, get the data
        if (clickedSearchBtn) {
            setClickSearch(false);
            loadFreelancersFun();
        }
    }, [filterData, clickedSearchBtn]);

    useEffect(() => {
        // If loadMore clicked, get the data
        if (loadMore) {
            loadFreelancersFun();
        }
    }, [loadMore]);

    // Modal
    const openModalRef = React.createRef();
    const closeModalRef = React.createRef();
    const [modalItem, setModalItem] = useState(null);
    const [clickedModalItem, setClickModalItem] = useState(false);

    useEffect(() => {
        if (modalItem && clickedModalItem) {
            openModalRef.current.click();
            setClickModalItem(false);
        }
    }, [clickedModalItem]);

    return (
        <>
            <FreeModal data={modalItem} closeModalRef={closeModalRef} />
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
                />
                <div className="my-5">
                    <div className="h3 mb-4 text-center">
                        Фрилансеры {count ? <> - {count}</> : " - 0"}
                    </div>

                    <div className="row  row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 my-4">
                        {Array.isArray(freelancers) &&
                            freelancers.length >= 1 &&
                            freelancers.map((data) => {
                                return (
                                    <FreeItem
                                        clickFun={() => {
                                            setModalItem(data);
                                            setClickModalItem(true);
                                        }}
                                        key={data.id}
                                        logo={data.logo}
                                        full_name={data.full_name}
                                        profession={data.profession}
                                        created={data.created}
                                        city={data.city}
                                        knowledge={data.knowledge}
                                    />
                                );
                            })}
                    </div>
                    {next ? (
                        <JobPagination
                            jobsLength={freelancers?.length}
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

export default Freelancers;

//  <div style={{ marginBottom: "2rem" }}>
{
    /* <label
htmlFor="fullName"
className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
>
<i class="bi bi-building fs-5 me-2"></i>
Полное имя компании
</label>
<input
type="text"
name="fullName"
id="fullName"
placeholder="Например: Adidas Company"
value={fullName}
onChange={(e) => {
    inputChange(e);
    setStartedWriting({
        ...startedWriting,
        fullName: true,
    });
}}
className={`form-control sm-placeholder ${
    startedWriting.fullName === true &&
    (formErrors?.fullName ? "is-invalid" : "is-valid")
}`}
style={{ borderRadius: "7px" }}
aria-describedby="inputName"
required
/>
<div class="invalid-feedback">{formErrors?.fullName}</div>
</div> 
<div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="compInfo"
                    className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                >
                    <i class="bi bi-file-earmark-text fs-5 me-2"></i>
                    Информация о компании
                </label>
                <textarea
                    name="compInfo"
                    id="compInfo"
                    placeholder={`Что вы можете сказать о компании. \n Чем она занимается? `}
                    value={compInfo}
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            compInfo: true,
                        });
                    }}
                    className={`form-control sm-placeholder ${
                        startedWriting.compInfo === true &&
                        (formErrors?.compInfo ? "is-invalid" : "is-valid")
                    }`}
                    style={{ borderRadius: "7px" }}
                    aria-describedby="compInfo"
                    required
                ></textarea>
                <div class="invalid-feedback">{formErrors?.compInfo}</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="address"
                    className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                >
                    <i class="bi bi-geo-alt-fill fs-5 me-2"></i>
                    Адресс компании
                </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Например: Adidas Company"
                    value={address}
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            address: true,
                        });
                    }}
                    className={`form-control sm-placeholder ${
                        startedWriting.address === true &&
                        (formErrors?.address ? "is-invalid" : "is-valid")
                    }`}
                    style={{ borderRadius: "7px" }}
                    aria-describedby="address"
                    required
                />
                <div class="invalid-feedback">{formErrors?.address}</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="phone_number"
                    className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                    style={{ fontSize: "14px" }}
                >
                    <i class="bi bi-telephone-fill fs-5 me-2"></i>
                    Телефонный номер компании
                </label>

                <input
                    type="number"
                    className={`form-control sm-placeholder ${
                        startedWriting.phone_number === true &&
                        (formErrors?.phoneNumber ? "is-invalid" : "is-valid")
                    }`}
                    placeholder="99362535353"
                    name="phone_number"
                    id="phone_number"
                    value={phone_number}
                    style={{ borderRadius: "7px" }}
                    onChange={(e) => {
                        inputChange(e);
                        setStartedWriting({
                            ...startedWriting,
                            phone_number: true,
                        });
                    }}
                    required
                    aria-describedby="phone_number"
                />
                <div class="invalid-feedback">{formErrors?.phoneNumber}</div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="calendar"
                    className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                    style={{ fontSize: "14px" }}
                >
                    <i class="bi bi-calendar3 fs-5 me-2"></i>
                    Дата основания компании
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
            <div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="companyType"
                    className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
                    style={{ fontSize: "14px" }}
                >
                    <i class="bi bi-gear-wide-connected fs-5 me-2"></i>
                    Выберите тип компании
                </label>

                <select
                    onChange={(e) => {
                        inputChange(e);
                    }}
                    className="form-select"
                    name="companyType"
                    required
                    id="companyType"
                    value={companyType}
                    style={{ borderRadius: "7px" }}
                    aria-label="Default select example"
                >
                    <option value="OHH">Hojalyk Jemgyýeti</option>
                    <option value="IP">Telekeçi</option>
                </select>
            </div>
             <div style={{ marginBottom: "2rem" }}>
                <label
                    htmlFor="upload-button"
                    role="button"
                    className="form-label text-gray w-100 py-0 fw-bold fs-6 d-inline-flex flex-column "
                    style={{ fontSize: "14px" }}
                >
                    <div className="d-inline-flex align-items-center">
                        <i class="bi bi-image fs-5 me-2"></i>
                        Загрузить изображение
                    </div>
                    {image.preview && (
                        <div className="d-flex align-items-center justify-content-center">
                            <img
                                src={image.preview}
                                alt="dummy"
                                width="300"
                                className="my-2"
                                style={{ borderRadius: "10px" }}
                                height="300"
                            />
                        </div>
                    )}
                </label>

                <input
                    type="file"
                    className="d-none"
                    id="upload-button"
                    onChange={handleChangeImage}
                    required
                />
            </div>
*/
}

//  <div style={{ marginBottom: "2rem" }}>
{
    /* <label
htmlFor="fullName"
className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
>
<i class="bi bi-building fs-5 me-2"></i>
Полное имя
</label>
<input
type="text"
name="fullName"
id="fullName"
placeholder="Например: Adidas Company"
value={fullName}
onChange={(e) => {
    inputChange(e);
    setStartedWriting({
        ...startedWriting,
        fullName: true,
    });
}}
className={`form-control sm-placeholder ${
    startedWriting.fullName === true &&
    (formErrors?.fullName ? "is-invalid" : "is-valid")
}`}
style={{ borderRadius: "7px" }}
aria-describedby="inputName"
required
/>
<div class="invalid-feedback">{formErrors?.fullName}</div>
</div> */
}

//  <div style={{ marginBottom: "2rem" }}>
// {/* <label
// htmlFor="experience"
// className="form-label text-gray py-0 fw-bold fs-6 d-flex align-items-center"
// >
// <i class="bi bi-file-earmark-text fs-5 me-2"></i>
// {/* <i class="bi bi-info-circle-fill fs-5 me-2"></i> */}
// Опыт (где работали?)
// </label>
// <textarea
// name="experience"
// id="experience"
// placeholder={`Что вы можете рассказать о себе.`}
// value={experience}
// onChange={(e) => {
//     inputChange(e);
//     setStartedWriting({
//         ...startedWriting,
//         experience: true,
//     });
// }}
// className={`form-control sm-placeholder ${
//     startedWriting.experience === true &&
//     (formErrors?.experience ? "is-invalid" : "is-valid")
// }`}
// style={{ borderRadius: "7px" }}
// aria-describedby="compInfo"
// required
// ></textarea>
// <div class="invalid-feedback">{formErrors?.experience}</div>
// </div> */}

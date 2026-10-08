// =========================================================
// FITZONE SPORTS CENTER
// JAVASCRIPT DÙNG CHUNG TOÀN WEBSITE
// =========================================================


// =========================================================
// 1. MENU DÙNG CHUNG TOÀN WEBSITE
// =========================================================

const menuContainer = document.querySelector("#site-menu");
const mobileMenuButton = document.querySelector("#mobileMenuButton");


if (menuContainer) {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";


    const menuItems = [

        ["index.html", "Trang chủ"],

        ["gioi-thieu.html", "Giới thiệu"],


        // =========================
        // BỘ MÔN
        // =========================

        {
            type: "dropdown",
            label: "Bộ môn",
            main: "bo-mon.html",

            children: [
                ["bo-mon-fitness.html", "Fitness"],
                ["bo-mon-pickleball.html", "Pickleball"],
                ["bo-mon-caulong.html", "Cầu lông"],
                ["bo-mon-bong-da.html", "Bóng đá"],
                ["bo-mon-bong-ro.html", "Bóng rổ"],
                ["bo-mon-bong-chuyen.html", "Bóng chuyền"]
            ]
        },


        ["lich-tap.html", "Lịch tập"],

        ["huan-luyen-vien.html", "Huấn luyện viên"],

        ["khoa-hoc.html", "Khóa học"],

        ["su-kien.html", "Sự kiện"],

        ["dang-ky.html", "Đăng ký"],

        ["lien-he.html", "Liên hệ"]

    ];


    // =====================================================
    // TẠO MENU
    // =====================================================

    menuContainer.innerHTML = `

        <nav class="menu">

            ${menuItems.map(function(item) {


                // =================================================
                // MENU BÌNH THƯỜNG
                // =================================================

                if (Array.isArray(item)) {

                    const active =
                        currentPage === item[0]
                            ? "active"
                            : "";


                    return `

                        <a
                            href="${item[0]}"
                            class="${active}"
                        >
                            ${item[1]}
                        </a>

                    `;
                }


                // =================================================
                // MENU BỘ MÔN
                // =================================================

                const dropdownActive =
                    currentPage === item.main ||
                    item.children.some(function(child) {

                        return currentPage === child[0];

                    });


                return `

                    <div class="menu-dropdown">

                        <a
                            href="${item.main}"
                            class="dropdown-toggle ${
                                dropdownActive ? "active" : ""
                            }"
                        >

                            <span>
                                ${item.label}
                            </span>

                            <span class="dropdown-arrow">
                                ⌄
                            </span>

                        </a>


                        <div class="dropdown-menu">

                            ${item.children.map(function(child) {

                                return `

                                    <a href="${child[0]}">
                                        ${child[1]}
                                    </a>

                                `;

                            }).join("")}

                        </div>

                    </div>

                `;

            }).join("")}

        </nav>

    `;


    // =====================================================
    // LẤY CÁC PHẦN TỬ MENU
    // =====================================================

    const dropdownBox =
        menuContainer.querySelector(".menu-dropdown");


    const dropdownToggle =
        menuContainer.querySelector(".dropdown-toggle");



    // =====================================================
    // HÀM ĐÓNG MENU MOBILE
    // =====================================================

    function closeMobileMenu() {

        menuContainer.classList.remove(
            "mobile-menu-open"
        );


        if (mobileMenuButton) {

            mobileMenuButton.classList.remove(
                "active"
            );

        }


        if (dropdownBox) {

            dropdownBox.classList.remove(
                "menu-open"
            );

        }

    }



    // =====================================================
    // NÚT HAMBURGER ☰
    // =====================================================

    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    menuContainer.classList.contains(
                        "mobile-menu-open"
                    );


                if (isOpen) {

                    closeMobileMenu();

                } else {

                    menuContainer.classList.add(
                        "mobile-menu-open"
                    );


                    mobileMenuButton.classList.add(
                        "active"
                    );

                }

            }
        );

    }



    // =====================================================
    // BỘ MÔN - MOBILE
    // =====================================================

    if (dropdownToggle && dropdownBox) {

        dropdownToggle.addEventListener(
            "click",
            function(event) {

                if (window.innerWidth <= 600) {

                    event.preventDefault();

                    event.stopPropagation();


                    dropdownBox.classList.toggle(
                        "menu-open"
                    );

                }

            }
        );

    }



    // =====================================================
    // CLICK CÁC LINK TRONG MENU
    // =====================================================

    menuContainer.addEventListener(
        "click",
        function(event) {

            const clickedLink =
                event.target.closest(".menu a");


            if (!clickedLink) {
                return;
            }


            // Trên mobile:
            // Bộ môn chỉ mở menu con,
            // không chuyển trang ngay.

            if (
                window.innerWidth <= 600 &&
                clickedLink.classList.contains(
                    "dropdown-toggle"
                )
            ) {

                return;

            }


            // Các link còn lại -> đóng menu

            if (window.innerWidth <= 600) {

                closeMobileMenu();

            }

        }
    );



    // =====================================================
    // CLICK RA NGOÀI MENU -> ĐÓNG
    // =====================================================

    document.addEventListener(
        "click",
        function(event) {

            if (window.innerWidth > 600) {
                return;
            }


            const insideMenu =
                menuContainer.contains(
                    event.target
                );


            const insideButton =
                mobileMenuButton &&
                mobileMenuButton.contains(
                    event.target
                );


            if (
                !insideMenu &&
                !insideButton
            ) {

                closeMobileMenu();

            }

        }
    );



    // =====================================================
    // NHẤN ESC -> ĐÓNG MENU
    // =====================================================

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );



    // =====================================================
    // KHI ĐỔI KÍCH THƯỚC MÀN HÌNH
    // =====================================================

    window.addEventListener(
        "resize",
        function() {

            if (window.innerWidth > 600) {

                closeMobileMenu();

            }

        }
    );

}



// =========================================================
// 2. POPUP ĐĂNG KÝ DÙNG CHUNG
// =========================================================

(function () {


    // =====================================================
    // TẠO HTML POPUP
    // =====================================================

    const modalHTML = `

        <div
            id="universalRegisterModal"
            class="universal-register-modal"
        >

            <div class="universal-register-box">


                <!-- NÚT ĐÓNG -->

                <button
                    type="button"
                    id="universalRegisterClose"
                    class="universal-register-close"
                >
                    ×
                </button>



                <!-- TIÊU ĐỀ -->

                <div class="universal-register-header">

                    <p>
                        FITZONE SPORTS CENTER
                    </p>

                    <h2>
                        ĐĂNG KÝ
                        <span>KHÓA HỌC</span>
                    </h2>

                    <small>
                        Điền thông tin để FITZONE liên hệ tư vấn.
                    </small>

                </div>



                <!-- FORM -->

                <form
                    id="universalRegisterForm"
                    novalidate
                >


                    <!-- HỌ TÊN -->

                    <div class="form-group">

                        <label for="universalFullname">
                            Họ và tên <span>*</span>
                        </label>

                        <input
                            type="text"
                            id="universalFullname"
                            name="fullname"
                            placeholder="Nhập họ và tên"
                            required
                        >

                        <small class="form-error"></small>

                    </div>



                    <!-- SĐT + EMAIL -->

                    <div class="form-row">


                        <div class="form-group">

                            <label for="universalPhone">
                                Số điện thoại <span>*</span>
                            </label>

                            <input
                                type="tel"
                                id="universalPhone"
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                inputmode="numeric"
                                maxlength="10"
                                required
                            >

                            <small class="form-error"></small>

                        </div>



                        <div class="form-group">

                            <label for="universalEmail">
                                Email <span>*</span>
                            </label>

                            <input
                                type="email"
                                id="universalEmail"
                                name="email"
                                placeholder="example@gmail.com"
                                required
                            >

                            <small class="form-error"></small>

                        </div>


                    </div>



                    <!-- KHÓA HỌC -->

                    <div class="form-group">

                        <label for="universalCourse">
                            Khóa học <span>*</span>
                        </label>

                        <select
                            id="universalCourse"
                            name="course"
                            required
                        >

                            <option value="">
                                -- Chọn khóa học --
                            </option>


                            <option
                                value="Fitness Cơ Bản"
                                data-fee="1.599.000đ"
                            >
                                Fitness Cơ Bản
                            </option>


                            <option
                                value="Fitness Nâng Cao"
                                data-fee="1.999.000đ"
                            >
                                Fitness Nâng Cao
                            </option>


                            <option
                                value="Pickleball Cơ Bản"
                                data-fee="1.799.000đ"
                            >
                                Pickleball Cơ Bản
                            </option>


                            <option
                                value="Pickleball Nâng Cao"
                                data-fee="2.199.000đ"
                            >
                                Pickleball Nâng Cao
                            </option>


                            <option
                                value="Cầu Lông Cơ Bản"
                                data-fee="1.599.000đ"
                            >
                                Cầu Lông Cơ Bản
                            </option>


                            <option
                                value="Cầu Lông Nâng Cao"
                                data-fee="1.999.000đ"
                            >
                                Cầu Lông Nâng Cao
                            </option>


                            <option
                                value="Bóng Đá Cơ Bản"
                                data-fee="1.799.000đ"
                            >
                                Bóng Đá Cơ Bản
                            </option>


                            <option
                                value="Bóng Đá Nâng Cao"
                                data-fee="2.199.000đ"
                            >
                                Bóng Đá Nâng Cao
                            </option>


                            <option
                                value="Bóng Rổ Cơ Bản"
                                data-fee="1.599.000đ"
                            >
                                Bóng Rổ Cơ Bản
                            </option>


                            <option
                                value="Bóng Rổ Nâng Cao"
                                data-fee="1.999.000đ"
                            >
                                Bóng Rổ Nâng Cao
                            </option>


                            <option
                                value="Bóng Chuyền Cơ Bản"
                                data-fee="1.599.000đ"
                            >
                                Bóng Chuyền Cơ Bản
                            </option>


                            <option
                                value="Bóng Chuyền Nâng Cao"
                                data-fee="1.999.000đ"
                            >
                                Bóng Chuyền Nâng Cao
                            </option>

                        </select>

                        <small class="form-error"></small>

                    </div>



                    <!-- HỌC PHÍ -->

                    <div class="form-group">

                        <label for="universalCourseFee">
                            Học phí
                        </label>

                        <input
                            type="text"
                            id="universalCourseFee"
                            name="courseFee"
                            value="Vui lòng chọn khóa học"
                            readonly
                        >

                    </div>



                    <!-- THỜI GIAN -->

                    <div class="form-group">

                        <label for="universalTime">
                            Thời gian mong muốn
                        </label>

                        <select
                            id="universalTime"
                            name="time"
                        >

                            <option value="">
                                -- Chọn thời gian --
                            </option>

                            <option value="Buổi sáng">
                                Buổi sáng
                            </option>

                            <option value="Buổi chiều">
                                Buổi chiều
                            </option>

                            <option value="Buổi tối">
                                Buổi tối
                            </option>

                            <option value="Cuối tuần">
                                Cuối tuần
                            </option>

                        </select>

                    </div>



                    <!-- GHI CHÚ -->

                    <div class="form-group">

                        <label for="universalMessage">
                            Ghi chú
                        </label>

                        <textarea
                            id="universalMessage"
                            name="message"
                            rows="3"
                            placeholder="Bạn muốn FITZONE tư vấn thêm điều gì?"
                        ></textarea>

                    </div>



                    <!-- ĐỒNG Ý -->

                    <div class="form-agree">

                        <input
                            type="checkbox"
                            id="universalAgree"
                            required
                        >

                        <label for="universalAgree">
                            Tôi đồng ý để FITZONE liên hệ tư vấn.
                        </label>

                    </div>



                    <!-- NÚT GỬI -->

                    <button
                        type="submit"
                        class="register-submit"
                    >
                        GỬI ĐĂNG KÝ →
                    </button>



                    <!-- THÔNG BÁO THÀNH CÔNG -->

                    <div
                        id="universalRegisterSuccess"
                        class="register-success"
                    >

                        <span class="success-icon">
                            ✓
                        </span>

                        <div>

                            <strong>
                                Gửi đăng ký thành công!
                            </strong>

                            <small>
                                FITZONE sẽ liên hệ với bạn sớm nhất.
                            </small>

                        </div>

                    </div>


                </form>

            </div>

        </div>

    `;



    // =====================================================
    // CHÈN POPUP VÀO BODY
    // =====================================================

    document.body.insertAdjacentHTML(
        "beforeend",
        modalHTML
    );



    // =====================================================
    // LẤY CÁC PHẦN TỬ
    // =====================================================

    const modal =
        document.getElementById(
            "universalRegisterModal"
        );


    const closeButton =
        document.getElementById(
            "universalRegisterClose"
        );


    const form =
        document.getElementById(
            "universalRegisterForm"
        );


    const courseSelect =
        document.getElementById(
            "universalCourse"
        );


    const courseFee =
        document.getElementById(
            "universalCourseFee"
        );


    const success =
        document.getElementById(
            "universalRegisterSuccess"
        );


    const phone =
        document.getElementById(
            "universalPhone"
        );



    // =====================================================
    // CẬP NHẬT HỌC PHÍ
    // =====================================================

    function updateFee() {

        if (
            !courseSelect ||
            !courseFee
        ) {

            return;

        }


        const option =
            courseSelect.options[
                courseSelect.selectedIndex
            ];


        const fee =
            option.getAttribute(
                "data-fee"
            );


        if (fee) {

            courseFee.value =
                fee +
                " / 3 tháng - 24 buổi";

        } else {

            courseFee.value =
                "Vui lòng chọn khóa học";

        }

    }



    if (courseSelect) {

        courseSelect.addEventListener(
            "change",
            updateFee
        );

    }



    // =====================================================
    // KIỂM TRA EMAIL
    // =====================================================

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            .test(email);

    }



    // =====================================================
    // KIỂM TRA SỐ ĐIỆN THOẠI
    // =====================================================

    function isValidPhone(phoneNumber) {

        return /^0\d{9}$/.test(
            phoneNumber
        );

    }



    // =====================================================
    // CHỈ CHO NHẬP SỐ ĐIỆN THOẠI
    // =====================================================

    if (phone) {

        phone.addEventListener(
            "input",
            function() {

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    this.value.length > 10
                ) {

                    this.value =
                        this.value.slice(
                            0,
                            10
                        );

                }

            }
        );

    }



    // =====================================================
    // MỞ POPUP
    // =====================================================

    function openRegister(courseName) {

        if (!modal) {
            return;
        }


        modal.classList.add(
            "show"
        );


        document.body.classList.add(
            "modal-open"
        );


        // Tự chọn khóa học

        if (
            courseName &&
            courseSelect
        ) {

            let found = false;


            for (
                let i = 0;
                i < courseSelect.options.length;
                i++
            ) {

                if (
                    courseSelect.options[i].value ===
                    courseName
                ) {

                    courseSelect.selectedIndex =
                        i;


                    found = true;

                    break;

                }

            }


            if (found) {

                updateFee();

            }

        }

    }



    // =====================================================
    // ĐÓNG POPUP
    // =====================================================

    function closeRegister() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "show"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }



    // =====================================================
    // NÚT X ĐÓNG
    // =====================================================

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeRegister
        );

    }



    // =====================================================
    // CLICK RA NGOÀI POPUP -> ĐÓNG
    // =====================================================

    if (modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === modal
                ) {

                    closeRegister();

                }

            }
        );

    }



    // =====================================================
    // PHÍM ESC -> ĐÓNG POPUP
    // =====================================================

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                closeRegister();

            }

        }
    );



    // =====================================================
    // TẤT CẢ NÚT ĐĂNG KÝ
    // =====================================================

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    ".open-register, " +
                    ".open-sport-register, " +
                    ".open-course-register, " +
                    "#openRegisterModal, " +
                    "#openRegisterModalBottom"
                );


            if (!button) {
                return;
            }


            event.preventDefault();


            const courseName =
                button.getAttribute(
                    "data-course"
                );


            openRegister(
                courseName
            );

        }
    );



 /* =====================================================
   FORM SUBMIT - GỬI ĐĂNG KÝ VỀ SPRING BOOT
===================================================== */


/* =====================================================
   POPUP THÔNG BÁO ĐĂNG KÝ THÀNH CÔNG
===================================================== */

const registerSuccessPopup =
    document.createElement("div");

registerSuccessPopup.className =
    "register-success-popup";

registerSuccessPopup.innerHTML = `
    <div class="register-success-box">

        <div class="register-success-icon">
            ✓
        </div>

        <h3>ĐĂNG KÝ THÀNH CÔNG</h3>

        <p>
            Cảm ơn bạn đã đăng ký.<br>
            FITZONE sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>

        <button
            type="button"
            class="register-success-ok">
            OK
        </button>

    </div>
`;


/* CHÈN POPUP VÀO TRANG */

document.body.appendChild(
    registerSuccessPopup
);


/* =====================================================
   NÚT OK
===================================================== */

const registerSuccessOk =
    registerSuccessPopup.querySelector(
        ".register-success-ok"
    );


/* =====================================================
   NÚT OK - ĐÓNG POPUP VÀ RELOAD TRANG
===================================================== */

registerSuccessOk.addEventListener(
    "click",
    function () {

        registerSuccessPopup.classList.remove(
            "show"
        );

        /* Reload lại trang đăng ký */
        setTimeout(
            function () {
                window.location.reload();
            },
            200
        );

    }
);


/* =====================================================
   CLICK RA NGOÀI POPUP
===================================================== */

registerSuccessPopup.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            registerSuccessPopup
        ) {

            registerSuccessPopup.classList.remove(
                "show"
            );

        }

    }
);


/* =====================================================
   FORM SUBMIT
===================================================== */

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =================================================
               LẤY DỮ LIỆU FORM
            ================================================= */

            const name =
                document.getElementById(
                    "universalFullname"
                );

            const phone =
                document.getElementById(
                    "universalPhone"
                );

            const email =
                document.getElementById(
                    "universalEmail"
                );

            const course =
                document.getElementById(
                    "universalCourse"
                );

            const agree =
                document.getElementById(
                    "universalAgree"
                );


            let valid = true;


            /* =================================================
               KIỂM TRA HỌ TÊN
            ================================================= */

            if (
                name.value.trim() === ""
            ) {

                alert(
                    "Vui lòng nhập họ và tên."
                );

                valid = false;

            }


            /* =================================================
               KIỂM TRA SỐ ĐIỆN THOẠI
            ================================================= */

            if (
                !isValidPhone(
                    phone.value
                )
            ) {

                alert(
                    "Số điện thoại phải gồm đúng 10 chữ số."
                );

                valid = false;

            }


            /* =================================================
               KIỂM TRA EMAIL
            ================================================= */

            if (
                !isValidEmail(
                    email.value.trim()
                )
            ) {

                alert(
                    "Vui lòng nhập email hợp lệ."
                );

                valid = false;

            }


            /* =================================================
               KIỂM TRA KHÓA HỌC
            ================================================= */

            if (
                !course ||
                course.value === ""
            ) {

                alert(
                    "Vui lòng chọn khóa học."
                );

                valid = false;

            }


            /* =================================================
               KIỂM TRA ĐỒNG Ý
            ================================================= */

            if (
                !agree.checked
            ) {

                alert(
                    "Vui lòng đồng ý để FITZONE liên hệ tư vấn."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            /* =================================================
               XÁC ĐỊNH CẤP ĐỘ
            ================================================= */

            const courseValue =
                course.value;

            const level =
                courseValue
                    .toLowerCase()
                    .includes("nâng cao")
                    ? "Nâng cao"
                    : "Cơ bản";


            /* =================================================
               DỮ LIỆU GỬI VỀ BACKEND
            ================================================= */

            const data = {

                fullname:
                    name.value.trim(),

                phone:
                    phone.value.trim(),

                email:
                    email.value.trim(),

                course:
                    courseValue,

                level:
                    level

            };


            try {

                /* =================================================
                   GỬI DỮ LIỆU SANG SPRING BOOT
                ================================================= */

                const response =
                    await fetch(
                        "http://localhost:8080/api/register",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                /* =================================================
                   KIỂM TRA BACKEND
                ================================================= */

                if (!response.ok) {

                    throw new Error(
                        "Backend trả về lỗi."
                    );

                }


                const result =
                    await response.text();


                console.log(
                    "Backend:",
                    result
                );

                /* HIỆN POPUP ĐĂNG KÝ THÀNH CÔNG */

registerSuccessPopup.classList.add("show");

registerPageForm.reset();

const fee = document.getElementById("courseFee");

if (fee) {
    fee.value = "Vui lòng chọn khóa học";
}

                /* =================================================
                   ĐÓNG FORM ĐĂNG KÝ
                ================================================= */

                closeRegister();


                /* =================================================
                   XÓA DỮ LIỆU FORM
                ================================================= */

                form.reset();


                if (courseFee) {

                    courseFee.value =
                        "Vui lòng chọn khóa học";

                }


                /* =================================================
                   HIỂN THỊ POPUP THÀNH CÔNG
                ================================================= */

                registerSuccessPopup.classList.add(
                    "show"
                );


            } catch (error) {

                console.error(
                    "Lỗi gửi đăng ký:",
                    error
                );


                alert(
                    "Không thể gửi đăng ký. Vui lòng kiểm tra kết nối Backend."
                );

            }

        }
    );

}

/* =========================================================
   TRANG ĐĂNG KÝ - TỰ CHỌN KHÓA HỌC + HIỆN HỌC PHÍ
   Ví dụ:
   dang-ky.html?course=fitness&level=basic
   dang-ky.html?course=fitness&level=advanced
========================================================= */

const pageCourseSelect =
    document.getElementById("course");

const pageLevelSelect =
    document.getElementById("level");

const pageCourseFee =
    document.getElementById("courseFee");


/* =========================================================
   BẢNG HỌC PHÍ
========================================================= */

const pageCoursePrices = {

    fitness: {
        basic: "1.599.000đ",
        advanced: "1.999.000đ"
    },

    pickleball: {
        basic: "1.799.000đ",
        advanced: "2.199.000đ"
    },

    caulong: {
        basic: "1.599.000đ",
        advanced: "1.999.000đ"
    },

    bongda: {
        basic: "1.799.000đ",
        advanced: "2.199.000đ"
    },

    bongro: {
        basic: "1.599.000đ",
        advanced: "1.999.000đ"
    },

    bongchuyen: {
        basic: "1.599.000đ",
        advanced: "1.999.000đ"
    }

};


/* =========================================================
   HÀM CẬP NHẬT HỌC PHÍ
========================================================= */

function updatePageCourseFee() {

    const courseSelect =
        document.getElementById("course");

    const courseFee =
        document.getElementById("courseFee");


    if (!courseSelect || !courseFee) {
        return;
    }


    const selectedOption =
        courseSelect.options[
            courseSelect.selectedIndex
        ];


    if (
        selectedOption &&
        selectedOption.dataset.fee
    ) {

        courseFee.value =
            selectedOption.dataset.fee
            + " / 3 tháng - 24 buổi";

        courseFee.classList.add(
            "fee-selected"
        );

    } else {

        courseFee.value =
            "Vui lòng chọn khóa học";

        courseFee.classList.remove(
            "fee-selected"
        );

    }

}

/* =========================================================
   KHI NGƯỜI DÙNG TỰ CHỌN KHÓA HỌC
========================================================= */

if (pageCourseSelect) {

    pageCourseSelect.addEventListener(
        "change",
        function () {

            updatePageCourseFee();

        }
    );

}


/* =========================================================
   KHI NGƯỜI DÙNG TỰ CHỌN CẤP ĐỘ
========================================================= */

if (pageLevelSelect) {

    pageLevelSelect.addEventListener(
        "change",
        function () {

            updatePageCourseFee();

        }
    );

}


/* =========================================================
   ĐỌC THÔNG TIN TỪ URL
========================================================= */

const pageUrlParams =
    new URLSearchParams(
        window.location.search
    );


const urlCourse =
    pageUrlParams.get("course");


const urlLevel =
    pageUrlParams.get("level");


/* =========================================================
   TỰ CHỌN KHÓA HỌC TỪ URL
========================================================= */

if (
    urlCourse &&
    pageCourseSelect
) {

    const courseOption =
        pageCourseSelect.querySelector(
            `option[value="${urlCourse}"]`
        );


    if (courseOption) {

        pageCourseSelect.value =
            urlCourse;

    }

}


/* =========================================================
   TỰ CHỌN CẤP ĐỘ TỪ URL
========================================================= */

if (
    urlLevel &&
    pageLevelSelect
) {

    const levelOption =
        pageLevelSelect.querySelector(
            `option[value="${urlLevel}"]`
        );


    if (levelOption) {

        pageLevelSelect.value =
            urlLevel;

    }

}



/* CẬP NHẬT HỌC PHÍ NGAY KHI MỞ TRANG */

updatePageCourseFee();


/* =========================================================
   TRANG ĐĂNG KÝ - GỬI FORM SANG SPRING BOOT
========================================================= */

const registerPageForm =
    document.getElementById("registerForm");

if (registerPageForm) {

    registerPageForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =================================================
               LẤY DỮ LIỆU
            ================================================= */

            const fullname =
                document.getElementById("fullname");

            const phone =
                document.getElementById("phone");

            const email =
                document.getElementById("email");

            const course =
                document.getElementById("course");

            const time =
                document.getElementById("time");

            const message =
                document.getElementById("message");

            const agree =
                document.getElementById("agree");

            const success =
                document.getElementById("registerSuccess");


            /* =================================================
               KIỂM TRA
            ================================================= */

            if (
                !fullname.value.trim() ||
                !/^0\d{9}$/.test(phone.value.trim()) ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
                    email.value.trim()
                ) ||
                !course.value ||
                !agree.checked
            ) {

                alert(
                    "Vui lòng kiểm tra và điền đầy đủ thông tin."
                );

                return;
            }


            /* =================================================
               XÁC ĐỊNH CẤP ĐỘ
            ================================================= */

            const level =
                course.value
                    .toLowerCase()
                    .includes("nâng cao")
                    ? "Nâng cao"
                    : "Cơ bản";


            /* =================================================
               DỮ LIỆU GỬI BACKEND
            ================================================= */

            const data = {

                fullname:
                    fullname.value.trim(),

                phone:
                    phone.value.trim(),

                email:
                    email.value.trim(),

                course:
                    course.value,

                level:
                    level,

                time:
                    time.value,

                message:
                    message.value.trim()

            };


            /* =================================================
               GỬI SANG SPRING BOOT
            ================================================= */

            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Backend trả về lỗi."
                    );

                }


                const result =
                    await response.text();

                console.log(
                    "Backend:",
                    result
                );




                /* =================================================
                   XÓA FORM
                ================================================= */

                registerPageForm.reset();

/* Đặt lại học phí */
const fee =
    document.getElementById("courseFee");

if (fee) {
    fee.value = "Vui lòng chọn khóa học";
}

/* HIỆN POPUP ĐĂNG KÝ THÀNH CÔNG */
registerSuccessPopup.classList.add("show");


            } catch (error) {

                console.error(
                    "Lỗi gửi đăng ký:",
                    error
                );

                alert(
                    "Không thể gửi đăng ký. Vui lòng kiểm tra Backend."
                );

            }

        }
    );

}

})();
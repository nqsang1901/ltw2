const mainFunCol1 = [
    {
        name: "Thông tin tài khoản",
        path: "profile",
        content: "Thông tin người dùng và các tài khoản của người dùng.",
        link: "Discover More",
        img: "/public/images/taikhoan.png",
        alt: "First One"
    },
    {
        name: "Đăng ký tài khoản",
        path: "registeraccount",
        content: "Đăng ký tài khoản thanh toán và tài khoản tiết kiệm.",
        link: "Discover More",
        img: "/public/images/thanhtoan.png",
        alt: "second one"
    },
    {
        name: "Chuyển khoản trong hệ thống",
        path: "transfer/In",
        content: 'Chuyển khoản cho các tài khoản có cùng hệ thống ngân hàng.',
        link: "Discover More",
        img: "/public/images/tronghethong.png",
        alt: "third gym training"
    },
]

const mainFunCol2 = [
    {
        name: "Chuyển khoản ngoài hệ thống",
        path: "transfer/Out",
        content: 'Chuyển khoản cho các tài khoản khác hệ thống ngân hàng.',
        link: "Discover More",
        img: "/public/images/liennganhang.png",
        alt: "fourth muscle"
    },
    {
        name: "Tiền gửi trực tuyến",
        path: "Deposit",
        content: "IThis template is built on Bootstrap v4.3.1 framework. It is easy to adapt the columns and sections.",
        link: "Discover More",
        img: "/public/images/tietkiem.png",
        alt: "training fifth"
    },
    {
        name: "Thông tin ứng dụng",
        path: "",
        content: 'Thông tin ứng dụng refund banking. Đang cập nhật thêm chức năng',
        link: "Discover More",
        img: "/public/images/thongtin.png",
        alt: "gym training"
    },
]

function getmainFunCol1() {
    return mainFunCol1;
}


function getmainFunCol2() {
    return mainFunCol2;
}

module.exports = {
    getmainFunCol1,
    getmainFunCol2,
};
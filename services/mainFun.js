const mainFunCol1 = [
    {
        name: "Thông tin tài khoản",
        path: "profile",
        content: "Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
        link: "Discover More",
        img: "/public/images/taikhoan.png",
        alt: "First One"
    },
    {
        name: "Thanh toán",
        path: "",
        content: "If you wish to support TemplateMo website via PayPal, please feel free to contact us. We appreciate it a lot.",
        link: "Discover More",
        img: "/public/images/thanhtoan.png",
        alt: "second one"
    },
    {
        name: "Chuyển khoản trong hệ thống",
        path: "transfer/In",
        content: 'Credit goes to <a rel="nofollow" href="https://www.pexels.com" target="_blank">Pexels website</a> for images and video background used in this HTML template.',
        link: "Discover More",
        img: "/public/images/tronghethong.png",
        alt: "third gym training"
    },
]

const mainFunCol2 = [
    {
        name: "Chuyển khoản ngoài hệ thống",
        path: "transfer/Out",
        content: 'You may want to browse through <a rel="nofollow" href="https://templatemo.com/tag/digital-marketing" target="_parent">Digital Marketing</a> or <a href="https://templatemo.com/tag/corporate">Corporate</a> HTML CSS templates on our website.',
        link: "Discover More",
        img: "/public/images/liennganhang.png",
        alt: "fourth muscle"
    },
    {
        name: "Tiền gửi trực tuyến",
        path: "",
        content: "IThis template is built on Bootstrap v4.3.1 framework. It is easy to adapt the columns and sections.",
        link: "Discover More",
        img: "/public/images/tietkiem.png",
        alt: "training fifth"
    },
    {
        name: "Thông tin dịch vụ",
        path: "",
        content: 'Suspendisse fringilla et nisi et mattis. Curabitur sed finibus nisi. Integer nibh sapien, vehicula et auctor.',
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
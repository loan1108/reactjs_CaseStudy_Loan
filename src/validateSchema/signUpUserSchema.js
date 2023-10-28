import * as Yup from "yup";
const signUpUserSchema = Yup.object({
    address:Yup.string().required("Bạn chưa nhập địa chỉ"),
    phone:Yup.string().required("Bạn chưa nhập số điện thoại"),
    userName:Yup.string().required("Bạn chưa nhập tên đăng nhập"),
    password:Yup.string().required("Bạn chưa nhập mật khẩu"),

})
export default signUpUserSchema;
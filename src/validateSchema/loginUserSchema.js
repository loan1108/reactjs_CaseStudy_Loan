import * as Yup from "yup";
const loginUserSchema = Yup.object({
    userName:Yup.string().required("Bạn chưa nhập tên đăng nhập"),
    password:Yup.string().required("Bạn chưa nhập mật khẩu"),

})
export default loginUserSchema;
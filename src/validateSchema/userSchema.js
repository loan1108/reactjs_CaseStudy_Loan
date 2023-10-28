import * as Yup from "yup";
const userSchema = Yup.object({
    name:Yup.string().required("Bạn chưa nhập tên"),
    address:Yup.string().required("Bạn chưa nhập địa chỉ"),
    phone:Yup.string().required("Bạn chưa nhập số điện thoại")

})
export default userSchema
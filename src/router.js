import { createBrowserRouter,} from "react-router-dom";
import Detail from "./Modules/Detail";
import Payment from "./Modules/Payment";
import Dashboard from "./Modules/Dashboard"
import YourCart from "./Modules/YourCart";
import BuyingHistory from "./Modules/BuyingHistory";
import Login from "./Modules/Login_SignUp/Login";
import SignUp from "./Modules/Login_SignUp/SignUp";
import routes from "./routes";
const router = createBrowserRouter([
  {path:routes.web.singup,element:<SignUp/>},
  {path:routes.web.login,element:<Login/>},
  { path: routes.web.cart, element: <YourCart/> },
  { path: `${routes.web.home}`, element: <Dashboard/> },
  { path: `${routes.web.detail}/:productId`, element: <Detail/> },
  { path: `${routes.web.payment}/:userId`, element: <Payment/> },
  { path:`${routes.web.history}/:userId`,element:<BuyingHistory/>}
]);
export default router;
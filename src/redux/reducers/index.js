import {combineReducers} from "redux";
import appConfigReducer from "../../redux/reducers/appConfigReducer";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import rtlReducer from "./rtlReducer";
import roundBordersReducer from "./roundBordersReducer";
import blocksShadowsReducer from "./blocksShadowsReducer";
import sidebarReducer from "./sidebarReducer";
import customizerReducer from "./customizerReducer";
import loginReducer from "./loginReducer";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import {reducer as reduxFormReducer} from "redux-form";
import userReducer from "./userReducer";
import vendorsReducer from "./vendorReducer";
import categoryReducer from "./categoryReducer";
import dashboardReducer from "./dashboardRedcer";
import profileReducer from "./profile";

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  roundBorders: roundBordersReducer,
  blocksShadows: blocksShadowsReducer,
  appConfig: appConfigReducer,
  customizer: customizerReducer,
  sidebar: sidebarReducer,
  user: authReducer,
  users: userReducer,
  vendors: vendorsReducer,
  login: loginReducer,
  orders: orderReducer,
  items: itemReducer,
  catas: categoryReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
});

export default reducer;

import routePaths from 'routing/paths'
import Dashboard from 'pages/Dashboard/Dashboard'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
// import ResetPasswordPage from 'pages/ResetPassword/ResetPasswordPage'
import AddDrink from 'pages/AddDrink/AddDrink'
import History from 'pages/History/History'

const config = [
  {
    path: routePaths.DASHBOARD,
    exact: true,
    component: Dashboard,
    //authOnly: true,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.LOGIN,
    component: Login,
    unAuthOnly: true,
    redirect: routePaths.Dashboard,
  },
  {
    path: routePaths.REGISTER,
    component: Register,
    redirect: routePaths.Dashboard,
    unAuthOnly: true,
  },
  // { path: routePaths.RESET_PASSWORD, component: ResetPasswordPage },
  {
    path: routePaths.ADDDRINK,
    component: AddDrink,
    redirect: routePaths.LOGIN,
  },
  { path: routePaths.HISTORY, component: History, redirect: routePaths.LOGIN },
]

export default config
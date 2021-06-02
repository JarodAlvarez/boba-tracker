import routePaths from 'routing/paths'
import Dashboard from 'pages/Dashboard/Dashboard'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
// import ResetPasswordPage from 'pages/ResetPassword/ResetPasswordPage'
import AddDrink from 'pages/AddDrink/AddDrink'
import History from 'pages/History/History'
import Error from 'pages/Error/Error'
import Edit_History from 'pages/History/Edit'

const config = [
  {
    path: routePaths.DASHBOARD,
    exact: true,
    component: Dashboard,
    authOnly: true,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.LOGIN,
    component: Login,
    unAuthOnly: true,
    redirect: routePaths.DASHBOARD,
  },
  {
    path: routePaths.REGISTER,
    component: Register,
    redirect: routePaths.DASHBOARD,
    unAuthOnly: true,
  },
  // { path: routePaths.RESET_PASSWORD, component: ResetPasswordPage },
  {
    path: routePaths.ADDDRINK,
    authOnly: true,
    component: AddDrink,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.HISTORY,
    authOnly: true,
    component: History,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.EDIT_HISTORY,
    authOnly: true,
    component: Edit_History,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.ERROR,
    component: Error,
  },
]

export default config

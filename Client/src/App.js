import { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { useStore } from './store/global-store'
import { useIsAuthed } from './auth/useAuth.hook'

import Header from './components/header/header.component'
import Home from './pages/home/home.component'
import Landing from './pages/landing/landing.component';

const App = () => {
  const { currentUser, setCurrentUser } = useStore()
  const { data, loading, error } = useIsAuthed()

  useEffect(() => {
    if (data?.isLoggedIn) {
      setCurrentUser(data.isAuthed.user)
    } else {
      setCurrentUser({})
    }
  }, [data, setCurrentUser])

  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Landing} />
        <Redirect from="*" to="/" />
      </Switch>
    </div >
  );
}

export default withRouter(App);


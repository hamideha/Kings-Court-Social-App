import { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { useStore } from './store/global-store'
import { useIsAuthed } from './auth/useAuth.hook'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/error-boundary/error-boundary.component'

import LoadingElement from './components/loading/loading.component';
import Header from './components/header/header.component'
import Home from './pages/home/home.component'
import Landing from './pages/landing/landing.component';

const App = () => {
  const { userLoadingState, currentUser, setCurrentUser } = useStore()
  const { data, loading, error } = useIsAuthed()

  useEffect(() => {
    if (data) {
      setCurrentUser(data.isAuthed?.user)
    } else {
      setCurrentUser()
    }
  }, [data, setCurrentUser])
  console.log(userLoadingState, currentUser)

  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
        {userLoadingState ? <LoadingElement /> :
          <>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Landing} />
              <Redirect from="*" to="/" />
            </Switch>
          </>
        }
      </ErrorBoundary>
    </div>
  );
}

export default withRouter(App);


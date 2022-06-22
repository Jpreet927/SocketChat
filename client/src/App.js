import React from 'react'
import Main from './components/Main'
import Home from './components/Home'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
        <Route path="/" component={Home} exact/>
        <Route path="/dashboard" component={Main} />
    </div>
  )
}

export default App
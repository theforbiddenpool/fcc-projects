import React, { useState } from 'react';
import './App.scss';

import { Timer } from './components/Timer';

const App = () =>  (
  <div className="page-wrapper">
    <header>
      <h1>Pomodoro Clock</h1>
    </header>
    <Timer />
  </div>
)

export default App;

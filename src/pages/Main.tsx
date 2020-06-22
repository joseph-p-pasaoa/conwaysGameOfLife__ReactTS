/*
JOSEPH P. PASAOA
MAIN Component | Tribute to Conway's Game of Life
*/



/* TODOS
- connect interval input to clock
- randomize new grid operation
- foresight coloration option (black = not going to die, red = going to die)
- grid units customization
- grid size customization
- draggable toggling of cells
- visualizations of stats like deaths, births
*/



/* IMPORTS */
import React, { useState, useEffect, ChangeEvent } from 'react';

import GameBoard from '../classes/GameBoard';
import '../App.scss';
import Header from '../components/Header';
import Controls from '../components/Controls';
import FeedbackDisplay from '../components/FeedbackDisplay';
import MatrixDisplay from '../components/MatrixDisplay';



/* TYPING */
type Coordinates = [number, number];



/* COMPONENT */
const App = () => {
  const [board, setBoard] = useState(new GameBoard());
  const [reload, setReload] = useState(0);
  const [tickInterval, setTickInterval] = useState(1000);  // number in milliseconds (ms)
  const [ticksPassed, setTicksPassed] = useState(0);
  const [isClockRunning, setIsClockRunning] = useState(false);

  useEffect(() => {
    let clock: NodeJS.Timer;
    if (isClockRunning && tickInterval !== 0) {
      clock = setInterval(() => {
        board.advanceToNextBoardState();
        setTicksPassed(ticksPassed + 1);
      }, tickInterval);
    }
    return () => clearInterval(clock);
  }, [board, isClockRunning, ticksPassed, tickInterval]);


  // EVENT HANDLERS
  const handleClickCell = (targetCoordinates: Coordinates) => {
    board.toggleCell(targetCoordinates);
    setReload(reload + 1);
  }

  const handleClickAdvanceOneTick = () => {
    board.advanceToNextBoardState();
    setTicksPassed(ticksPassed + 1);
  }

  const handleToggleClock = () => {
    setIsClockRunning(!isClockRunning);
  }

  const handleChangeTickInterval = (event: ChangeEvent<HTMLInputElement>) => {
    setTickInterval(parseInt(event.target.value));
  }


  // RETURN
  return (
    <div className='Main'>
      <div className='sidebar'>
        <Header />
        <Controls
          isClockRunning={isClockRunning}
          tickInterval={tickInterval}
          handleChangeTickInterval={handleChangeTickInterval}
          handleClickAdvanceOneTick={handleClickAdvanceOneTick}
          handleToggleClock={handleToggleClock}
        />
        <FeedbackDisplay
          isClockRunning={isClockRunning}
          ticksPassed={ticksPassed}
        />
      </div>
      <MatrixDisplay
        boolMatrix={board.boolMatrix}
        handleClickCell={handleClickCell}
        reload={reload}
      />
    </div>
  );
}



/* EXPORT */
export default App;

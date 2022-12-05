import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

function DrinkInProgress() {
  const {
    setTitle,
  } = useContext(AppContext);

  useEffect(() => {
    document.title = 'Drink In Progress';
    setTitle(document.title);
  }, []);
  return (
    <h1>Drink in progress</h1>
  );
}

export default DrinkInProgress;

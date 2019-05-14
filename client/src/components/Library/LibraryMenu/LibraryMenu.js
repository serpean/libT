import React from 'react';
import Button from '../../Button/Button';

import './LibraryMenu.css';
const library = () => {
  return (
    <div className="sideNav">
      <ul className="sideNav-list">
        <li>
          <h2>Bibliotecas</h2>
        </li>
        <li>
          <a href="/">Lo quiero</a>
        </li>
        <li>
          <a href="/">En progreso</a>
        </li>
        <li>
          <a href="/">Terminado</a>
        </li>
        <hr />
        <li>
          <Button design="success">+ Añadir</Button>
        </li>
        <li>
          <a href="/">Terror</a>
        </li>
      </ul>
    </div>
  );
};

export default library;

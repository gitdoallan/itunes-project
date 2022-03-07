import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Loading extends React.Component {
  render() {
    return (
      <div>
        <span>Carregando...</span>
        <Redirect to="/search" />
      </div>
    );
  }
}

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropType from 'prop-types';

export default class Loading extends React.Component {
  render() {
    const { redirect, goTo } = this.props;
    return (
      <div>
        <span>Carregando...</span>
        { redirect && <Redirect to={ goTo } /> }
      </div>
    );
  }
}

Loading.propTypes = {
  redirect: PropType.bool.isRequired,
  goTo: PropType.string.isRequired,
};

import React from 'react';
import PropType, { string } from 'prop-types';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async listSongs(id) {
    const result = await getMusics(id);
    // this.setState({ data: result });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { data } = this.state;
    this.listSongs(id);
    return (
      <div data-testid="page-album">
        <span>Página: Album!!!!</span>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: string,
    }),
  }).isRequired,
};

import React from 'react';
import PropType from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { trackInfo, loadingAlbum } = this.props;
    return (
      loadingAlbum
        ? <span>Carregando...</span>
        : (
          <div>
            {
              trackInfo?.map((element) => (
                <div key={ element.trackId } className="song">
                  <p>{element.trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ element.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                </div>
              ))
            }
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropType.arrayOf(PropType.any).isRequired,
  loadingAlbum: PropType.bool.isRequired,
};

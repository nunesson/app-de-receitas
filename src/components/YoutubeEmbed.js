import React from 'react';
import PropTypes from 'prop-types';

export default function YoutubeEmbed({ url }) {
  const getIdFromUrl = (url.split('='))[1];
  return (
    <div>
      <iframe
        title="Youtube"
        width="350"
        height="220"
        src={ `https://www.youtube.com/embed/${getIdFromUrl}` }
        frameBorder="0"
        allow="accelerometerautoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string,
}.isRequired;

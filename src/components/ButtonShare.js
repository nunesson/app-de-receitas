import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonShare() {
  const [link, setlink] = useState(false);

  const history = useHistory();
  const handleClick = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setlink(true);
    const time = 5000;
    setTimeout(() => setlink(false), time);
  };

  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClick }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {link && <p>Link copied!</p>}
    </>
  );
}

export default ButtonShare;

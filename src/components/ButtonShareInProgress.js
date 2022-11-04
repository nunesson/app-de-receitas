import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonShareInProgress() {
  const [link, setlink] = useState(false);
  const params = useParams();
  const handleClick = () => {
    copy(`http://localhost:3000/${params['meals' || 'drinks']}/${params.id}`);
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
      { link && <p>Link copied!</p> }
    </>
  );
}

export default ButtonShareInProgress;

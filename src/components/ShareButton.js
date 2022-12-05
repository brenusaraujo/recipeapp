import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setIsCopied, textToCopy, isCopied }) {
  const handleShare = async (text) => {
    await copy(text);
    setIsCopied(true);
  };
  return (
    <>
      <button
        className="details__share"
        type="button"
        data-testid="share-btn"
        onClick={ () => handleShare(textToCopy) }
      >
        <img className="details__icon" src={ shareIcon } alt="share" />
      </button>
      {isCopied && <p className="link">Link copiado!</p>}
    </>
  );
}

ShareButton.propTypes = {
  textToCopy: PropTypes.string.isRequired,
  setIsCopied: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
};

export default ShareButton;

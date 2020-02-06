'use strict';

const minInp = document.querySelector('.minInp');
const maxInp = document.querySelector('.maxInp');

const rangeWrapper = document.querySelector('.rangeWrapper');
const leftSquare = document.querySelector('.leftSquare');
const rightSquare = document.querySelector('.rightSquare');

const squareWidth
  = Math.round(leftSquare.getBoundingClientRect().right
  - leftSquare.getBoundingClientRect().left);

const rangeWrapperLeft = rangeWrapper.getBoundingClientRect().left;
const rangeWrapperRight = rangeWrapper.getBoundingClientRect().right;
const rangeWrapperWidth = rangeWrapperRight - rangeWrapperLeft;

// Зпапись изначальных положений полузнков в input
function initialInpValue() {
  minInp.value
    = Math.round(parseFloat(getComputedStyle(leftSquare).marginLeft));

  maxInp.value
    = Math.round(
      rangeWrapperWidth - parseFloat(getComputedStyle(rightSquare).marginRight)
    );
}
initialInpValue()

function moveAt(e, squareTarget, clickPosition) {
  if (clickPosition) { // Именно при клике, а не перетягивании
    const leftDifference = leftSquare.getBoundingClientRect().right;
    const rightDifference = rightSquare.getBoundingClientRect().right;

    if (
      Math.abs(clickPosition - leftDifference)
      < Math.abs(clickPosition - rightDifference)
    ) {
      moveLeftSquare();
    } else {
      moveRightSquare();
    }

    return false;
  }

  if (squareTarget.className === 'leftSquare') { // Именно при перетягивании
    if ((e.clientX - rangeWrapperLeft) >= -squareWidth / 2) {
      moveLeftSquare();
    }
  } else if (squareTarget.className === 'rightSquare') {
    if ((rangeWrapperRight - e.clientX) >= -squareWidth / 2) {
      moveRightSquare();
    }
  }

  function moveRightSquare() {
    const marginRight
      = Math.round(
        rangeWrapperRight - e.clientX - Math.round(squareWidth / 2)
      ) + 'px';

    if (
      parseInt(getComputedStyle(rightSquare).marginRight >= -squareWidth / 2)
    ) {
      return;
    }
    rightSquare.style.marginRight = marginRight;

    maxInp.value
      = Math.round(
        rangeWrapperWidth
      - (parseInt(getComputedStyle(rightSquare).marginRight) + squareWidth)
      );
  }

  function moveLeftSquare() {
    const marginLeft
      = e.clientX - rangeWrapperLeft - squareWidth / 2 + 'px';

    if (
      parseInt(getComputedStyle(rightSquare).marginRight >= -squareWidth / 2)
    ) {
      return;
    }
    leftSquare.style.marginLeft = marginLeft;

    minInp.value = Math.round(
      parseFloat(getComputedStyle(leftSquare).marginLeft) + squareWidth
    );
  }
}

rangeWrapper.onmousedown = (mouseDownEvent) => {
  const squareTarget = mouseDownEvent.target;

  document.onmousemove = (e) => {
    moveAt(e, squareTarget);
  };

  return false;
};

document.onmouseup = (e) => {
  document.onmousemove = null;
};

rangeWrapper.onclick = (e) => {
  const clickPosition = e.clientX;

  moveAt(e, null, clickPosition);
};

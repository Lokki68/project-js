const container = document.querySelector('.container');
const gridButton = document.querySelector('#submit-grid');
const clearGridButton = document.querySelector('#clear-grid');
const gridWidth = document.querySelector('#width-range');
const gridHeight = document.querySelector('#height-range');
const colorButton = document.querySelector('#color-input');
const eraseButton = document.querySelector('#erase-button');
const paintButton = document.querySelector('#paint-button');
const widthValue = document.querySelector('#width-value');
const heightValue = document.querySelector('#height-value');

const events = {
  mouse: {
    down: 'mousedown',
    up: 'mouseup',
    move: 'mousemove',
  },
  touch: {
    down: 'touchstart',
    up: 'touchend',
    mobe: 'touchmove',
  },
};

let deviceType = '';

let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
};

isTouchDevice();

gridButton.addEventListener('click', () => {
  container.innerHTML = '';
  let count = 0;

  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    const div = document.createElement('div');
    div.classList.add('gridRow');

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;

      const col = document.createElement('div');
      col.classList.add('gridCol');
      col.setAttribute('id', `col-${count}`);
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = 'transparent';
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        const elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY,
        ).id;
        checker(elementId);
      });

      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      div.appendChild(col);
    }

    container.appendChild(div);
  }
});

function checker(elementId) {
  const gridColumns = document.querySelectorAll('.gridCol');
  gridColumns.forEach((col) => {
    if (col.id === elementId && draw) {
      if (erase) {
        col.style.backgroundColor = 'transparent';
      } else {
        col.style.backgroundColor = colorButton.value;
      }
    }
  });
}

clearGridButton.addEventListener('click', () => {
  container.innerHTML = '';
});

eraseButton.addEventListener('click', () => {
  erase = true;
});

paintButton.addEventListener('click', () => {
  erase = false;
});

gridWidth.addEventListener('input', () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener('input', () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onLoad = () => {
  gridWidth.value = 0;
  gridHeight.value = 0;
};

const optionsButtons = document.querySelectorAll('.option-btn');
const advancedButtons = document.querySelectorAll('.adv-option-btn');
const fontName = document.getElementById('formatName');
const fontSizeRef = document.getElementById('formatSize');
const writingArea = document.getElementById('text-input');
const linkButton = document.getElementById('createLink');
const alignButtons = document.querySelectorAll('.align');
const spacingButtons = document.querySelectorAll('.spacing');
const formatButtons = document.querySelectorAll('.format');
const scriptButtons = document.querySelectorAll('.script');

const fontList = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier New',
  'Cursive',
];

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((value) => {
    let option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modifyText(button.id, false, null);
  });
});

advancedButtons.forEach((button) => {
  button.addEventListener('change', () => {
    modifyText(button.id, false, null);
  });
});

linkButton.addEventListener('click', () => {
  let userLink = prompt('Enter a URL');
  if (/http/i.test(userLink)) {
    modifyText('createLink', false, userLink);
  } else {
    userLink = `http://${userLink}`;
    modifyText('createLink', false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener('click', () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains('active')) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add('active');
        }
      } else {
        button.classList.toggle('active');
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove('active');
  });
};

window.onload = initializer();

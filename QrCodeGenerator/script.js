const download = document.querySelector('.download');
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qr-code');
const qrText = document.querySelector('.qr-text');
const shareBtn = document.querySelector('.share-btn');
const sizes = document.querySelector('.sizes');

dark.addEventListener('input', handelDarkColor);
light.addEventListener('input', handelLightColor);
qrText.addEventListener('input', handleQrText);
shareBtn.addEventListener('click', handleShare);
sizes.addEventListener('change', handleSize);

const defaultUrl = 'https://www.google.com/';
let colorLight = '#fff',
  colorDark = '#000',
  text = defaultUrl,
  size = 300;

function handelDarkColor(e) {
  colorDark = e.target.value;
  generateQrCode();
}

function handelLightColor(e) {
  colorLight = e.target.value;
  generateQrCode();
}

function handleQrText(e) {
  let value = e.target.value;

  if (!value) text = defaultUrl;
  else text = value;

  generateQrCode();
}

async function generateQrCode() {
  qrContainer.innerHTML = '';
  new QRCode('qr-code', {
    text,
    height: size,
    width: size,
    colorDark,
    colorLight,
  });

  download.href = await resolveDataUrl();
}

async function handleShare() {
  setTimeout(async () => {
    try {
      const base64url = await resolveDataUrl();
      const blob = await (await fetch(base64url)).blob();
      const file = new File([blob], 'QRCode.png', { type: blob.type });

      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert('Error sharing: ' + error.message);
    }
  }, 100);
}

function handleSize(e) {
  size = e.target.value;

  generateQrCode();
}

function resolveDataUrl() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = document.querySelector('#qr-code img');
      if (img.currentSrc) {
        resolve(img.currentSrc);
        return;
      }

      const canvas = document.querySelector('canvas');
      resolve(canvas.toDataURL());
    }, 50);
  });
}

generateQrCode();

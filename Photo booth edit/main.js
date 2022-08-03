const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    var facingMode = 'user';
    navigator.mediaDevices.getUserMedia({video: true, audio: false, video: {facingMode: facingMode}})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(() => {
            console.log(`This feature only work with webcam`)
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;


        ctx.putImageData(pixels, 0, 0);
    }, 30);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;//Red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;//Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.7;//Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];//Red
        pixels.data[i + 300] = pixels.data[i + 1];//Green
        pixels.data[i - 350] = pixels.data[i + 2];//Blue
    }
    return pixels;
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Probably a handsome man">`
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
const peer = new Peer({
  key: 'b94d8553-e4c6-4641-847e-5ef1e2267f89',
  debug: 3,
});

peer.on('open', () => {
  document.getElementById('my-id').textContent = peer.id;
});

peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
})

let localStream;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const videoElm = document.getElementById('my-video');
    videoElm.srcObject = stream;
    videoElm.play();

    localStream = stream;
  })
  .catch((error) => {
    console.error('mediaDevice.getUserMedia() error', error);
    return;
  });

document.getElementById('make-call').onclick = () => {
  const theirID = document.getElementById('their-id').value;
  const mediaConnection = peer.call(theirID, localStream);
  setEventListener(mediaConnection);
}

const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    const videoElm = document.getElementById('their-video');
    videoElm.srcObject = stream;
    videoElm.play();
  })
}
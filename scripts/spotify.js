const frame = document.getElementById("spotify-frame");

function toggleSpotify() {
    if (frame.innerHTML === "") {
      frame.innerHTML = '<iframe style="border-radius:12px; opacity:0.7;" src="https://open.spotify.com/embed/playlist/0rzc1ZbkXvpuQzL3uqdw0X?utm_source=generator&theme=0" width="100%" height="250px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
    } else {
      frame.innerHTML = "";
    }
  }

const bgVideo = document.getElementById('bg-contact');
let reverseInternal;

if (bgVideo) {
  bgVideo.addEventListener('ended', function(){
    bgVideo.pause();

    reverseInternal = setInterval(() => {
      if(bgVideo.currentTime > 0){
        bgVideo.currentTime -= 0.4;
      } else {
        clearInterval(reverseInternal);
        bgVideo.play();
      }
    }, 30)
  });
}

// ======= header ========== //

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== link ========

const card = document.getElementById('github-link');

card.addEventListener('click', () => {
    window.open('https://github.com/KauaCristian-Dev', '_blank');
});

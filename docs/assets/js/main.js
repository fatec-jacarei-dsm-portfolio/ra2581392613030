<<<<<<< HEAD
// JS carregou: libera as animações (sem JS, tudo aparece normalmente)
document.documentElement.classList.remove('no-js');

// ================= CABEÇALHO =================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// menu do celular
menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// destaca no menu a seção que está na tela
const navLinks = nav.querySelectorAll('a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id], footer[id]').forEach((s) => sectionObserver.observe(s));

// ================= ANIMAÇÃO AO ROLAR (leve subida) =================
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // anima só uma vez
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ================= CARROSSEL DE PROJETOS =================
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-track]');
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    const dotsBox = carousel.querySelector('[data-dots]');
    const slides = [...track.children];

    // distância entre o início de um card e o do próximo
    const step = () => {
        if (slides.length < 2) return track.clientWidth;
        return slides[1].offsetLeft - slides[0].offsetLeft;
    };

    // quantas "paradas" o carrossel tem
    const positions = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        return maxScroll <= 2 ? 1 : Math.ceil(maxScroll / step() - 0.05) + 1;
    };

    const current = () => Math.round(track.scrollLeft / step());

    const goTo = (index) => {
        const max = track.scrollWidth - track.clientWidth;
        track.scrollTo({ left: Math.min(index * step(), max) });
    };

    function buildDots() {
        dotsBox.innerHTML = '';
        const total = positions();
        carousel.classList.toggle('is-static', total <= 1);

        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsBox.appendChild(dot);
        }
        update();
    }

    function update() {
        const total = positions();
        const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
        const index = atEnd ? total - 1 : current();

        prev.disabled = track.scrollLeft <= 2;
        next.disabled = atEnd;
        [...dotsBox.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    prev.addEventListener('click', () => goTo(current() - 1));
    next.addEventListener('click', () => goTo(current() + 1));

    // setas do teclado quando o carrossel está em foco
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current() - 1);
        if (e.key === 'ArrowRight') goTo(current() + 1);
    });

    let ticking = false;
    track.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener('resize', buildDots);
    buildDots();
});

// ================= ANO NO RODAPÉ =================
document.getElementById('year').textContent = new Date().getFullYear();
=======
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
>>>>>>> 0544b18f91ef21fe4ad34fe9deb5e459b85768c3

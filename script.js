// Scroll reveal + connector draw-on animation
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal, .connector-svg').forEach(el=>io.observe(el));

// 3D tilt on hover (cards + avatar)
document.querySelectorAll('.tilt-wrap').forEach(wrap=>{
  const el = wrap.querySelector('.tilt');
  if(!el) return;
  wrap.addEventListener('mousemove', (e)=>{
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rotY = (x - 0.5) * 16;
    const rotX = (0.5 - y) * 16;
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    el.style.setProperty('--mx', `${x*100}%`);
    el.style.setProperty('--my', `${y*100}%`);
  });
  wrap.addEventListener('mouseleave', ()=>{
    el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
});

// active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a=>{
  if(a.getAttribute('href') === path) a.classList.add('active');
});

// Scroll parallax on kolam dividers — subtle depth, capped so it never overlaps content
const kolams = document.querySelectorAll('.kolam');
if(kolams.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  let ticking = false;
  const updateKolamParallax = () => {
    const vh = window.innerHeight;
    kolams.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const centerOffset = (r.top + r.height/2) - vh/2; // distance from viewport center
      const shift = Math.max(-14, Math.min(14, centerOffset * 0.06 * (i % 2 === 0 ? 1 : -1)));
      el.style.transform = `translateY(${shift}px)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(updateKolamParallax); ticking = true; }
  }, {passive:true});
  updateKolamParallax();
}

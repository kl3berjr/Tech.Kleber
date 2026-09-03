document.body.classList.add("js-loaded");
const body=document.body;
const themeToggle=document.getElementById('themeToggle');
const mobileToggle=document.getElementById('mobileToggle');
const mobileNav=document.getElementById('mobileNav');
const progress=document.getElementById('scrollProgress');
const year=document.getElementById('year');
year.textContent=new Date().getFullYear();

const savedTheme=localStorage.getItem('kn-theme');
if(savedTheme==='dark') body.classList.add('dark');

function syncThemeLabel(){
  const dark=body.classList.contains('dark');
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeToggle.setAttribute('title', dark ? 'Modo claro' : 'Modo escuro');
}
syncThemeLabel();

themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('kn-theme',body.classList.contains('dark')?'dark':'light');
  syncThemeLabel();
});

mobileToggle.addEventListener('click',()=>mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>mobileNav.classList.remove('open')));

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0 ? (window.scrollY/max)*100 : 0)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

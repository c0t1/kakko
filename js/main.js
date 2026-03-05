'use strict';

// フッターの著作権年を自動更新
document.getElementById('year').textContent = new Date().getFullYear();

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('is-open');
  navMenu.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// ナビリンククリックでメニューを閉じる
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// スムーススクロール（header の高さを考慮）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

// スクロール時にヘッダーに影をつける
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(0,0,0,0.12)'
    : '0 1px 8px rgba(0,0,0,0.06)';
}, { passive: true });

'use strict';

// フッターの著作権年を自動更新
document.getElementById('year').textContent = new Date().getFullYear();

// ロゴサフィックスアニメーション
const SUFFIXES = ['web', 'design', 'ec', 'fieldwork'];
const suffixEl = document.getElementById('logo-suffix');
let suffixIndex = 0;

function showSuffix(text) {
  suffixEl.textContent = text;
  suffixEl.classList.remove('slide-out');
  suffixEl.classList.add('slide-in');
}

function rotateSuffix() {
  suffixEl.classList.remove('slide-in');
  suffixEl.classList.add('slide-out');
  suffixEl.addEventListener('animationend', () => {
    suffixIndex = (suffixIndex + 1) % SUFFIXES.length;
    showSuffix(SUFFIXES[suffixIndex]);
  }, { once: true });
}

showSuffix(SUFFIXES[0]);
setInterval(rotateSuffix, 2800);

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

// お問い合わせフォーム送信
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('form-submit-btn');
const gformIframe = document.getElementById('gform-iframe');
let formSubmitted = false;

function validateField(input) {
  const row = input.closest('.form-row');
  const errorEl = row.querySelector('.form-error');
  let valid = true;

  if (input.required && !input.value.trim()) {
    valid = false;
  } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    valid = false;
  }

  input.classList.toggle('is-error', !valid);
  if (errorEl) errorEl.classList.toggle('is-visible', !valid);
  return valid;
}

contactForm.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('is-error')) validateField(input);
  });
});

// iframe の load = Google フォームの送信完了
gformIframe.addEventListener('load', () => {
  if (!formSubmitted) return;
  contactForm.hidden = true;
  formSuccess.hidden = false;
});

contactForm.addEventListener('submit', e => {
  const inputs = [...contactForm.querySelectorAll('.form-input')];
  const allValid = inputs.map(validateField).every(Boolean);
  if (!allValid) {
    e.preventDefault();
    return;
  }

  formSubmitted = true;
  submitBtn.disabled = true;
  submitBtn.textContent = '送信中…';
  // action/method/target が設定済みなので通常 submit させる
});

// スクロール時にヘッダーに影をつける
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(0,0,0,0.12)'
    : '0 1px 8px rgba(0,0,0,0.06)';
}, { passive: true });

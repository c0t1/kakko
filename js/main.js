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

// お問い合わせフォーム送信
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('form-submit-btn');
const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfnsN2Dlwuxf3QhfTve7Nye2GzyLuN_II5G2ne2FHDXLL4A8A/formResponse';

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

contactForm.addEventListener('submit', async e => {
  e.preventDefault();

  const inputs = [...contactForm.querySelectorAll('.form-input')];
  const allValid = inputs.map(validateField).every(Boolean);
  if (!allValid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = '送信中…';

  const body = new FormData(contactForm);

  try {
    await fetch(FORM_ACTION, { method: 'POST', body, mode: 'no-cors' });
  } catch (_) {
    // no-cors のため常にネットワークエラーに見えるが実際は送信済み
  }

  contactForm.hidden = true;
  formSuccess.hidden = false;
});

// スクロール時にヘッダーに影をつける
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(0,0,0,0.12)'
    : '0 1px 8px rgba(0,0,0,0.06)';
}, { passive: true });

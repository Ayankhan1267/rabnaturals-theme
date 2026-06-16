(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initAnnouncementBar();
    initMobileNav();
    initSearch();
    initPosterCarousel();
    initTabs();
    initProductCarousels();
    initVideoSection();
    initTestimonialCarousel();
    initQuantitySelectors();
    initAddToCart();
    initProductGallery();
    initSortBy();
  });

  /* ============================================
     ANNOUNCEMENT BAR
     ============================================ */
  function initAnnouncementBar() {
    const slider = document.querySelector('[data-announcement-slider]');
    if (!slider) return;
    const slides = slider.querySelectorAll('.announcement-bar__slide');
    if (slides.length < 2) return;
    let current = 0;
    const dots = document.querySelectorAll('.announcement-bar__dot');
    const prev = document.querySelector('.announcement-bar__arrow--left');
    const next = document.querySelector('.announcement-bar__arrow--right');
    const closeBtn = document.querySelector('.announcement-bar__close');

    function goTo(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    let interval = setInterval(() => goTo(current + 1), 3500);

    if (prev) prev.addEventListener('click', function() { clearInterval(interval); goTo(current - 1); interval = setInterval(() => goTo(current + 1), 3500); });
    if (next) next.addEventListener('click', function() { clearInterval(interval); goTo(current + 1); interval = setInterval(() => goTo(current + 1), 3500); });
    dots.forEach(d => { d.addEventListener('click', function() { clearInterval(interval); goTo(parseInt(this.dataset.index)); interval = setInterval(() => goTo(current + 1), 3500); }); });
    if (closeBtn) closeBtn.addEventListener('click', function() { document.querySelector('.announcement-bar').style.display = 'none'; });
  }

  /* ============================================
     MOBILE NAV
     ============================================ */
  function initMobileNav() {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const nav = document.querySelector('[data-mobile-nav]');
    const closeBtns = document.querySelectorAll('[data-mobile-close]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() { nav.classList.toggle('active'); document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : ''; });
    closeBtns.forEach(btn => btn.addEventListener('click', function() { nav.classList.remove('active'); document.body.style.overflow = ''; }));
  }

  /* ============================================
     SEARCH OVERLAY
     ============================================ */
  function initSearch() {
    const openBtn = document.querySelector('[data-search-open]');
    const overlay = document.querySelector('[data-search-overlay]');
    const closeBtn = document.querySelector('[data-search-close]');
    const input = document.querySelector('[data-search-input]');
    if (!openBtn || !overlay) return;

    openBtn.addEventListener('click', function() {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (input) setTimeout(() => input.focus(), 100);
    });

    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
  }

  /* ============================================
     POSTER CAROUSEL
     ============================================ */
  function initPosterCarousel() {
    const wrapper = document.querySelector('[data-poster-carousel]');
    if (!wrapper) return;
    const slides = wrapper.querySelectorAll('.poster-carousel__slide');
    if (slides.length < 2) return;
    let current = 0;
    const dots = document.querySelectorAll('.poster-carousel__dot');
    const prev = document.querySelector('[data-poster-prev]');
    const next = document.querySelector('[data-poster-next]');

    function goTo(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    let interval = setInterval(() => goTo(current + 1), 5000);

    if (prev) prev.addEventListener('click', function() { clearInterval(interval); goTo(current - 1); interval = setInterval(() => goTo(current + 1), 5000); });
    if (next) next.addEventListener('click', function() { clearInterval(interval); goTo(current + 1); interval = setInterval(() => goTo(current + 1), 5000); });
    dots.forEach(d => { d.addEventListener('click', function() { clearInterval(interval); goTo(parseInt(this.dataset.index)); interval = setInterval(() => goTo(current + 1), 5000); }); });
  }

  /* ============================================
     TABS (BESTSELLERS)
     ============================================ */
  function initTabs() {
    const tabsContainer = document.querySelector('[data-tabs]');
    if (!tabsContainer) return;
    const tabs = tabsContainer.querySelectorAll('[data-tab]');
    const panelsContainer = tabsContainer.closest('.bestsellers') || document;
    const panels = panelsContainer.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const index = this.dataset.tab;
        const panel = panelsContainer.querySelector('[data-panel="' + index + '"]');
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ============================================
     PRODUCT CAROUSELS
     ============================================ */
  function initProductCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      let isDown = false, startX, scrollLeft;
      carousel.addEventListener('mousedown', function(e) { isDown = true; startX = e.pageX - this.offsetLeft; scrollLeft = this.scrollLeft; this.style.cursor = 'grabbing'; });
      carousel.addEventListener('mouseleave', function() { isDown = false; this.style.cursor = ''; });
      carousel.addEventListener('mouseup', function() { isDown = false; this.style.cursor = ''; });
      carousel.addEventListener('mousemove', function(e) { if (!isDown) return; e.preventDefault(); const x = e.pageX - this.offsetLeft; const walk = (x - startX) * 2; this.scrollLeft = scrollLeft - walk; });
    });
  }

  /* ============================================
     VIDEO SECTION
     ============================================ */
  function initVideoSection() {
    const triggers = document.querySelectorAll('[data-video-trigger]');
    const modal = document.querySelector('[data-video-modal]');
    const player = document.querySelector('[data-video-player]');
    const closeBtns = document.querySelectorAll('[data-video-close]');
    if (!modal || !player) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const url = this.dataset.videoTrigger;
        let embedUrl = '';
        if (url.includes('youtube') || url.includes('youtu.be')) {
          const id = url.includes('youtu.be') ? url.split('/').pop().split('?')[0] : new URL(url).searchParams.get('v');
          embedUrl = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
        } else if (url.includes('shopify.com')) {
          embedUrl = url;
        }
        if (embedUrl) {
          player.innerHTML = '<iframe src="' + embedUrl + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeVideo() {
      modal.classList.remove('active');
      player.innerHTML = '';
      document.body.style.overflow = '';
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeVideo));
    modal.addEventListener('click', function(e) { if (e.target === modal) closeVideo(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeVideo(); });
  }

  /* ============================================
     TESTIMONIAL CAROUSEL
     ============================================ */
  function initTestimonialCarousel() {
    const track = document.querySelector('[data-testimonial-track]');
    const prev = document.querySelector('[data-testimonial-prev]');
    const next = document.querySelector('[data-testimonial-next]');
    if (!track) return;

    if (prev) prev.addEventListener('click', function() { track.scrollBy({ left: -340, behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function() { track.scrollBy({ left: 340, behavior: 'smooth' }); });
  }

  /* ============================================
     QUANTITY SELECTORS
     ============================================ */
  function initQuantitySelectors() {
    document.querySelectorAll('[data-qty-down]').forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('[data-qty-input]');
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
        input.dispatchEvent(new Event('change'));
      });
    });

    document.querySelectorAll('[data-qty-up]').forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('[data-qty-input]');
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
        input.dispatchEvent(new Event('change'));
      });
    });
  }

  /* ============================================
     ADD TO CART
     ============================================ */
  function initAddToCart() {
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const variantId = this.dataset.addToCart;
        if (!variantId) return;

        const qtyInput = this.closest('.main-product') ? document.querySelector('[data-qty-input]') : null;
        const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

        const formData = { items: [{ id: variantId, quantity: quantity }] };

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
          updateCartCount();
          const originalText = btn.textContent;
          btn.textContent = 'Added!';
          btn.style.background = '#10b981';
          setTimeout(function() { btn.textContent = originalText; btn.style.background = ''; }, 2000);
        })
        .catch(function(err) {
          console.error('Add to cart error:', err);
        });
      });
    });
  }

  function updateCartCount() {
    fetch('/cart.js')
      .then(function(res) { return res.json(); })
      .then(function(cart) {
        const countEl = document.querySelector('[data-cart-count]');
        if (countEl) countEl.textContent = cart.item_count;
      });
  }

  /* ============================================
     PRODUCT GALLERY
     ============================================ */
  function initProductGallery() {
    const thumbs = document.querySelectorAll('.main-product__thumb');
    const mainImage = document.getElementById('ProductMainImage');
    if (!thumbs.length || !mainImage) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImage.src = this.dataset.image;
      });
    });
  }

  /* ============================================
     SORT BY
     ============================================ */
  function initSortBy() {
    const sortSelect = document.querySelector('[data-sort]');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

})();

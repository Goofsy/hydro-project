class Slider {
  _slides = document.querySelectorAll('.slider__slide');
  _btnPrev = document.querySelector('.slider__btn--prev');
  _btnNext = document.querySelector('.slider__btn--next');
  _dotsContainer = document.querySelector('.slider__dots');

  _curSlide = 0;
  _maxSlide = this._slides.length;

  constructor() {
    this._createDots();
    this._goToSlide(0);
    this._activeDot(0);

    this._addHandleDots();
    this._addHandleBtnPrev();
    this._addHandleBtnNext();
    this._addHandleArrows();
  }

  _createDots() {
    this._slides.forEach((_, i) => { 
      this._dotsContainer.insertAdjacentHTML('beforeend', `<button class="slider__dots__dot" data-slide="${i}"></button>`);
    });
  }

  _goToSlide(curSlide) {
    this._slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`
    })
  };

  _prevSlide() {
    if (this._curSlide === 0) this._curSlide = this._maxSlide - 1;
    else { this._curSlide-- };

    this._goToSlide(this._curSlide);
    this._activeDot(this._curSlide);   
  };

  _nextSlide() {
    if (this._curSlide === this._maxSlide - 1) this._curSlide = 0;
    else { this._curSlide++ };

    this._goToSlide(this._curSlide);   
    this._activeDot(this._curSlide); 
  };

  _activeDot(curSlide) {
    const dots = document.querySelectorAll('.slider__dots__dot');
    dots.forEach(dot => dot.classList.remove('slider__dots__dot--active'));
  
    const dot = this._dotsContainer.querySelector(`[data-slide='${curSlide}']`);
    dot.classList.add('slider__dots__dot--active');
  };

  _addHandleDots() {
    this._dotsContainer.addEventListener('click', this._handleDots.bind(this));
  }

  _handleDots(e) {    
    if (!e.target.classList.contains('slider__dots__dot')) return;
    const {slide} = e.target.dataset;
    this._goToSlide(slide);
    this._activeDot(slide)    
  }

  _addHandleBtnPrev() {
    this._btnPrev.addEventListener('click', this._prevSlide.bind(this));
  }

  _addHandleBtnNext() {
    this._btnNext.addEventListener('click', this._nextSlide.bind(this));
  }

  _addHandleArrows() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this._prevSlide();
      if (e.key === 'ArrowRight') this._nextSlide();
    });
  }
}

new Slider();
import 'core-js';
import 'regenerator-runtime/runtime';

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

    this._addHandlerDots();
    this._addHandlerBtnPrev();
    this._addHandlerBtnNext();
    this._addHandlerArrows();
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

  _addHandlerDots() {
    this._dotsContainer.addEventListener('click', this._handleDots.bind(this));
  }

  _handleDots(e) {    
    if (!e.target.classList.contains('slider__dots__dot')) return;
    const {slide} = e.target.dataset;
    this._goToSlide(slide);
    this._activeDot(slide)    
  }

  _addHandlerBtnPrev() {
    this._btnPrev.addEventListener('click', this._prevSlide.bind(this));
  }

  _addHandlerBtnNext() {
    this._btnNext.addEventListener('click', this._nextSlide.bind(this));
  }

  _addHandlerArrows() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this._prevSlide();
      if (e.key === 'ArrowRight') this._nextSlide();
    });
  }
}
new Slider();

// Smooth scrolling
const scroll = new SmoothScroll('.header a[href*="#"]');
  

class SendEmail {
  _form = document.querySelector('.form');
  _formInfo = document.querySelector('.form__info');
  _inputName = document.querySelector('#name');
  _inputEmail = document.querySelector('#email');
  _inputPhone = document.querySelector('#phone');
  _inputMessage = document.querySelector('#message');
  
  constructor() {
    this._addHandlerForm();
    this._addFilledClass();
    this._removeErrorClassHandler();
  }

  _removeErrorClassHandler() {
    this._form.addEventListener('click', this._removeErrorClass.bind(this));
  }

  _removeErrorClass(e) {
    if (!e.target.closest('.form__group__input--error')) return;
    e.target.classList.remove('form__group__input--error');
    this._formInfo.innerHTML = '';
    this._formInfo.classList.remove('form__info--error');
  }

  _addFilledClass() {
    this._form.addEventListener('change', e => {
      if (e.target.value.length === 0 || e.target.value === '')  e.target.classList.remove('form__group__input--filled');
      else {
        e.target.classList.add('form__group__input--filled');
      }
    });
  }

  _removeFilledClass() {
    document.querySelectorAll('.form__group__input').forEach(input => {
      input.classList.remove('form__group__input--filled');
    });
  }

  _addHandlerForm() {
    this._form.addEventListener('submit', this._handleForm.bind(this));
  }

  async _handleForm(e) {
    e.preventDefault();
    try {
      const _inputNameValue = this._inputName.value;
      const _inputEmailValue = this._inputEmail.value;
      const _inputPhoneValue = this._inputPhone.value;
      const _inputMessageValue = this._inputMessage.value;

      if (_inputNameValue.length < 3 || _inputNameValue === null || _inputNameValue === ''){
        this._inputName.classList.add('form__group__input--error');
        throw new Error('Imię musi zawierac przynajmniej 3 znaki!');
      }

      if (!this._validateEmailAddress(_inputEmailValue)) {
        this._inputEmail.classList.add('form__group__input--error');
        throw new Error('Niepoprawny e-mail!');
      }

      if (_inputPhoneValue.length < 8 || _inputPhoneValue === null || _inputPhoneValue === ''){
        this._inputPhone.classList.add('form__group__input--error');
        throw new Error('Nr telefonu musi zawierac przynajmniej 8 znaków!');
      }

      if (_inputMessageValue === null || _inputMessageValue === ''){
        this._inputMessage.classList.add('form__group__input--error');
        throw new Error('Napisz coś :)');
      }


      const send = await this._sendEmail(_inputNameValue, _inputEmailValue, _inputPhoneValue, _inputMessageValue);
      
      if (!send === 'OK') throw new Error('Coś poszło nie tak.');
      this._form.reset();
      this._removeFilledClass();
      this._formInfo.innerHTML = 'Wiadomośc została wysłana';

    } catch (err) {
      this._formInfo.innerHTML = err.message;
      this._formInfo.classList.add('form__info--error');
    }
  }

  _validateEmailAddress(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  _sendEmail(name, email, phone, message) {
      try {
        return Email.send({
          // SecureToken : "1b17ee09-4190-4d7c-bsd83-efeb38674305",   
          SecureToken : "1b17ee09-4190-4d7c-bd83-efeb38674305",   
          To : 'dawid.stud@gmail.com',
          From : email,
          Subject : `${name}, tel: ${phone}`,
          Body : message
        }) 
      } catch (err) {
        console.log(err);
      }   
    }

}
new SendEmail();

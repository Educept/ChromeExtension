class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);

    this.initializeRipple();

    let isOn = false;

    if (!isOn) {
      const button = document.querySelector('#sign-in');
      button.disabled = true;
      button.dataset.opacity = 0;
      button.style.background = '#424242';
    }

    onSwitch.addEventListener('mouseover', this.changeImage.bind(this));
    onSwitch.addEventListener('mouseout', this.changeImage.bind(this));
    onSwitch.addEventListener('click', this.turnOnExtension.bind(this));
  }

  initializeRipple() {
    $.ripple(".btn", {
      debug: false, // Turn Ripple.js logging on/off
      on: 'mousedown', // The event to trigger a ripple effect
      opacity: 0.4, // The opacity of the ripple
      multi: false, // Allow multiple ripples per element
      duration: 0.7, // The duration of the ripple
      // Filter function for modifying the speed of the ripple
      rate: function(pxPerSecond) {
            return pxPerSecond;
        },
      easing: 'linear' // The CSS3 easing function of the ripple
    });
  }

  changeImage(e) {
    const powerImage = document.querySelector('#extension-switch > img');

    if (e.type == 'mouseover') {
      powerImage.src = 'assets/power_button_green.png';
    } else if (!this.isOn) {
      powerImage.src = 'assets/power_button.png';
    }
  }

  turnOnExtension() {
    const powerImage = document.querySelector('#extension-switch > img');
    powerImage.src = 'assets/power_button_green.png';
    this.isOn = true;

    const button = document.querySelector('#sign-in');
    button.disabled = false;
    button.dataset.opacity = 0.4;
    button.style.background = '#2196F3';
  }
}

new App({
  extensionSwitch: '#extension-switch',
})
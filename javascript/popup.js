class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);

    this.initializeRipple();

    onSwitch.addEventListener('mouseover', this.changeImage.bind(this));
    onSwitch.addEventListener('mouseout', this.changeImage.bind(this));
    // onSwitch.addEventListener('click');
  }

  initializeRipple() {
    $.ripple(".ripple", {
      debug: false, // Turn Ripple.js logging on/off
      on: 'mousedown', // The event to trigger a ripple effect
      opacity: 0.4, // The opacity of the ripple
      color: "#2196F3", // Set the background color.
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
    } else {
      powerImage.src = 'assets/power_button.png';
    }
  }
}

new App({
  extensionSwitch: '#extension-switch',
})
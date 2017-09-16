class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);
    const form = document.querySelector(selectors.form);

    this.initializeRipple();

    let isOn;
    this.getCurrentState();

    onSwitch.addEventListener('mouseover', this.changeImage.bind(this));
    onSwitch.addEventListener('mouseout', this.changeImage.bind(this));
    onSwitch.addEventListener('click', this.switchState.bind(this));
    form.addEventListener('submit', this.signIn.bind(this));
  }

  signIn(e) {
    e.preventDefault();

    const femail = document.querySelector('#email');
    const fpassword = document.querySelector('#password');

    $.ajax({
      type: "POST",
      url: 'http://10.33.2.152:3000/api/signin/',
      data: {
        'email': femail.value,
        'password': fpassword.value
      },
      success: function(response) {
        console.log(response);
      }
      // dataType: 'text'
    })

    femail.value = "";
    fpassword.value = "";
  }

  getCurrentState() {
    return getOnOffState((savedStatus) => {
      this.isOn = savedStatus;
      if (savedStatus) {
        this.turnOnOffExtension();
        return true;
      } else {
        const button = document.querySelector('#sign-in');
        button.disabled = true;
        button.dataset.opacity = 0;
        button.style.background = '#424242';
        this.turnOnOffExtension();
        return false;
      }
    });
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

  switchState(e) {
    this.isOn = !this.isOn;
    this.turnOnOffExtension();
  }

  turnOnOffExtension() {
    if (this.isOn) {
      const powerImage = document.querySelector('#extension-switch > img');
      powerImage.src = 'assets/power_button_green.png';
      this.isOn = true;

      const button = document.querySelector('#sign-in');
      button.disabled = false;
      button.dataset.opacity = 0.4;
      button.style.background = '#2196F3';

      const inputs = document.querySelectorAll('input').forEach((input) => {
        input.disabled = false;
      });
    } else {
      const powerImage = document.querySelector('#extension-switch > img');
      powerImage.src = 'assets/power_button.png';
      this.isOn = false;

      const button = document.querySelector('#sign-in');
      button.disabled = true;
      button.dataset.opacity = 0;
      button.style.background = '#424242';

      const inputs = document.querySelectorAll('input').forEach((input) => {
        input.disabled = true;
      });
    }

    saveOnOffState(this.isOn);
  }
}

new App({
  extensionSwitch: '#extension-switch',
  form: '#sign-in-form',
})
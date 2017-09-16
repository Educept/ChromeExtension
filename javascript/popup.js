class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);
    const form = document.querySelector(selectors.form);

    this.initializeRipple();

    let uid;
    let isOn;
    this.getCurrentState();

    onSwitch.addEventListener('mouseover', this.changeImage.bind(this));
    onSwitch.addEventListener('mouseout', this.changeImage.bind(this));
    onSwitch.addEventListener('click', this.switchState.bind(this));
    document.querySelector('#signup').addEventListener('click', this.signUp.bind(this));
    document.querySelector('#login').addEventListener('click', this.logIn.bind(this));
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  initializeExtension() {
    console.log(this.uid);
    console.log(this.isOn);
    if (this.uid && this.isOn) {
      document.querySelector('#sign-in-form').style.display = 'none';
    }
  }

  receiveUID() {
    return getUID((uid) => {
      this.uid = uid;
      this.initializeExtension();
      if (uid) {
        return uid;
      } else {
        return null;
      }
    });
  }

  logIn() {
    const femail = document.querySelector('#email');
    const fpassword = document.querySelector('#password');

    $.ajax({
      type: "POST",
      url: 'http://10.33.2.152:3000/api/login/',
      data: {
        "email": femail.value,
        "password": fpassword.value
      },
      success: function(response) {
        this.uid = response;
        saveState(this.isOn, response);
      }
    })

    femail.value = "";
    fpassword.value = "";
  }

  signUp() {
    const femail = document.querySelector('#email');
    const fpassword = document.querySelector('#password');

    $.ajax({
      type: "POST",
      url: 'http://10.33.2.152:3000/api/signup/',
      data: {
        "email": femail.value,
        "password": fpassword.value
      },
      success: function(response) {
        this.uid = response;
        saveState(this.isOn, response);
      }
    })

    femail.value = "";
    fpassword.value = "";
  }

  getCurrentState() {
    return getStatus((status) => {
      this.isOn = status;
      this.turnOnOffExtension();
      this.uid = this.receiveUID();
      if (this.isOn) {
        return true;
      } else {
        const button = document.querySelector('.sign-in');
        button.disabled = true;
        button.dataset.opacity = 0;
        button.style.background = '#424242';
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

      const button = document.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
        button.dataset.opacity = 0.4;
        button.style.background = '#2196F3';
      });

      const inputs = document.querySelectorAll('input').forEach((input) => {
        input.disabled = false;
      });
    } else {
      const powerImage = document.querySelector('#extension-switch > img');
      powerImage.src = 'assets/power_button.png';
      this.isOn = false;

      const button = document.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
        button.dataset.opacity = 0;
        button.style.background = '#424242';
      });

      const inputs = document.querySelectorAll('input').forEach((input) => {
        input.disabled = true;
      });
    }

    saveState(this.isOn, this.uid);
  }
}

new App({
  extensionSwitch: '#extension-switch',
  form: '#sign-in-form',
})
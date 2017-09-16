class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);
    const form = document.querySelector(selectors.form);

    chrome.storage.local.clear();

    this.initializeRipple();

    let uid;
    let isOn = false;
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
    this.validate(this.uid);
  }

  validate(uid) {
    $.ajax({
      type: "POST",
      url: 'http://10.33.2.152:3000/api/validate/',
      data: {
        "uid": this.uid,
      },
      success: (response) => {
        this.uid = response;
        if (this.uid !== 'null' && this.isOn) {
          document.querySelector('#sign-in-form').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '0px';
          document.querySelector('#web-app-links').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '1px';
        } else {
          document.querySelector('#web-app-links').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '1px';
          document.querySelector('#sign-in-form').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '0px';
        }
      }
    })
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
      success: (response) => {
        console.log(response);
        this.uid = response;
        saveState(this.isOn, response);

        if (this.uid !== 'null' && this.isOn) {
          document.querySelector('#sign-in-form').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '0px';
          document.querySelector('#web-app-links').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '1px';
        } else {
          document.querySelector('#web-app-links').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '1px';
          document.querySelector('#sign-in-form').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '0px';
        }
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

        if (this.uid !== 'null' && this.isOn) {
          document.querySelector('#sign-in-form').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '0px';
          document.querySelector('#web-app-links').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '1px';
        } else {
          document.querySelector('#web-app-links').style.visibility = 'hidden';
          document.querySelector('#sign-in-form').style.height = '1px';
          document.querySelector('#sign-in-form').style.visibility = 'visible';
          document.querySelector('#web-app-links').style.height = '0px';
        }
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
    this.initializeExtension();
  }

  turnOnOffExtension() {
    if (this.isOn) {
      const powerImage = document.querySelector('#extension-switch > img');
      powerImage.src = 'assets/power_button_green.png';

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
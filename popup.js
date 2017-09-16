class App {
  constructor(selectors) {
    const onSwitch = document.querySelector(selectors.extensionSwitch);

    onSwitch.addEventListener('mouseover', this.changeImage.bind(this));
    onSwitch.addEventListener('mouseout', this.changeImage.bind(this));
    onSwitch.addEventListener('click');
  }

  changeImage(e) {
    const powerImage = document.querySelector('#extension-switch > img');

    if (e.type == 'mouseover') {
      powerImage.src = 'power_button_green.png';
    } else {
      powerImage.src = 'power_button.png';
    }
  }
}

new App({
  extensionSwitch: '#extension-switch',
})
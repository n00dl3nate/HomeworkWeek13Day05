import PubSub from '../helpers/pub_sub.js';

export default class SelectView {

  constructor(element) {
    this.element = element;
  }

  bindEvents() {
    PubSub.subscribe('InstrumentFamilies:data-ready', ({detail}) => {
      const allInstrumentFamilies = detail;
      this.populate(allInstrumentFamilies);
    });

    this.element.addEventListener('change', ({target: {value}}) => {
      const selectedIndex = value;
      PubSub.publish('SelectView:change', selectedIndex);
    });
  }

  populate(instrumentFamilyData) {
    instrumentFamilyData.forEach(({name}, index) => {
      const option = document.createElement('option');
      option.textContent = name;
      option.value = index;
      this.element.appendChild(option);
    });
  }

}

import PubSub from "../helpers/pub_sub.js";

export default class InstrumentFamilies {

  constructor(data) {
    this.data = data;
  }

  bindEvents() {
    PubSub.publish('InstrumentFamilies:data-ready', this.data);

    PubSub.subscribe('SelectView:change', ({detail}) => {
      const selectedIndex = detail;
      this.publishFamilyDetail(selectedIndex);
    });
  }

  publishFamilyDetail(selectedIndex) {
    const selectedFamily = this.data[selectedIndex];
    PubSub.publish('InstrumentFamilies:selected-family-ready', selectedFamily)
  }

}

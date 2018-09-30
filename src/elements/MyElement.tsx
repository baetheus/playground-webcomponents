import { render } from 'inferno';

import { MyComponent } from '../components';

export class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  private getProps() {
    return {
      age: Number(this.getAttribute('age')) || 0,
      sex: this.getAttribute('sex') || '',
      location: this.getAttribute('location') || '',
    };
  }

  private render() {
    render(MyComponent({ ...this.getProps() }), this);
  }

  static get observedAttributes() {
    return ['age', 'sex', 'location'];
  }

  public connectedCallback() {
    this.render();
  }

  public attributeChangedCallback() {
    this.render();
  }
}

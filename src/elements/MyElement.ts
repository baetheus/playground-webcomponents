import { render } from 'inferno';
import { mapValues } from 'lodash';

import { MyComponent } from '../components';

/**
 * Looking into encapsulating a customElement with a simple prop/factory setup
 */

/**
 * Interface to help define attributes and deserialization of customElement
 */
interface PropType<P = any> {
  default?: P;
  deserialize?: (p: string | null) => P;
}

/**
 * A sample dictionary of which props to watch and how to deserialize them
 */
const props: Record<string, PropType> = {
  age: {
    default: 0,
    deserialize: (x?: string) => Number(x),
  } as PropType<number>,
  sex: {
    default: '',
  },
  location: {
    default: '',
  },
};

/**
 * A helper function to map attributes to props object
 *
 * This could probably get a lot cleaner with the help of io-ts
 */
const getPropsFactory = (
  model: Record<string, PropType>,
  that: HTMLElement
) => <P>(): P => {
  return mapValues(model, (p, key) => {
    if (typeof p.deserialize === 'function') {
      return p.deserialize(that.getAttribute(key)) || p.default;
    }
    return that.getAttribute(key) || p.default;
  }) as P;
};

/**
 * An example class
 */
export class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  private getProps = getPropsFactory(props, this);

  private render() {
    render(MyComponent(this.getProps()), this);
  }

  static get observedAttributes() {
    return Object.keys(props);
  }

  public connectedCallback() {
    this.render();
  }

  public attributeChangedCallback() {
    this.render();
  }
}

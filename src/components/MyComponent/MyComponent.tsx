import * as React from 'react';

export interface Props {
  age: number;
  sex: string;
  location: string;
}

/**
 * @render react
 * @name MyComponent
 * @description A component used to test various react/inferno features.
 * @example
 * <MyComponent age={32} sex="Alien" location="Temple" />
 */
export const MyComponent = ({ age, sex, location }: Props) => {
  // throw new Error('Error test'); What happens when we throw in a component?
  return (
    <span>
      {age} / {sex} / {location}
    </span>
  );
};

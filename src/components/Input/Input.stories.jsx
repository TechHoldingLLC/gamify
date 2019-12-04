/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Input from '.';

storiesOf('Components|Input', module)
  .addDecorator((storyFn) => <div style={{ maxWidth: '300px' }}>{storyFn()}</div>)
  .add('text', () => {
    return (
      <Input
        type="text"
        disabled={boolean('Disabled', false)}
        readonly={boolean('Readonly', false)}
      />
    );
  })
  .add('number', () => {
    return (
      <Input
        type="number"
        disabled={boolean('Disabled', false)}
        readonly={boolean('Readonly', false)}
      />
    );
  })
  .add('with label', () => {
    return <Input type="text" label="First Name" />;
  })
  .add('with error', () => {
    return <Input type="text" isError errorText="Input is invalid." />;
  });

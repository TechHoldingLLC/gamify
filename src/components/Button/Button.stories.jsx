/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Button from '.';

const sizes = ['xs', 'sm', 'md', 'lg'];
const themes = ['default', 'primary', 'success', 'danger'];

storiesOf('Components|Button', module)
  .add('with text', () => {
    return (
      <Button size={select('Size', sizes, 'sm')} theme={select('Theme', themes, 'default')}>
        {text('Text', 'Text')}
      </Button>
    );
  })
  .add('disabled', () => {
    return (
      <Button
        size={select('Size', sizes, 'sm')}
        theme={select('Theme', themes, 'default')}
        disabled
      >
        {text('Text', 'Text')}
      </Button>
    );
  });

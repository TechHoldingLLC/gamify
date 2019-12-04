/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Anchor from '.';

const AnchorDecorator = (storyFn) => (
  <MemoryRouter>
    <div style={{ marginTop: '2%' }}>{storyFn()}</div>
  </MemoryRouter>
);
const sizes = ['xs', 'sm', 'md', 'lg'];
const themes = ['default', 'primary', 'success', 'danger'];

storiesOf('Components|Anchor', module)
  .addDecorator(AnchorDecorator)
  .add('with text', () => {
    return (
      <Anchor size={select('Size', sizes, 'sm')} theme={select('Theme', themes, 'default')}>
        {text('Text', 'Text')}
      </Anchor>
    );
  });

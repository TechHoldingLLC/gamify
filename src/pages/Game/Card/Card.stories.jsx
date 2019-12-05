/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Card from '.';

storiesOf('Components|Card', module)
  .add('Closed', () => {
    return <Card text={text('Text', '1')} open={boolean('Open', false)} />;
  })
  .add('Opened', () => {
    return <Card text={text('Text', '1')} open={boolean('Open', true)} />;
  })
  .add('Matched', () => {
    return <Card text={text('Text', '1')} open={boolean('Open', true)} matched />;
  })
  .add('Not Matched', () => {
    return <Card text={text('Text', '1')} open={boolean('Open', true)} notMatched />;
  });

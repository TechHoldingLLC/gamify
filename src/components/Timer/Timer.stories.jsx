/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Timer from '.';

storiesOf('Components|Timer', module).add('Default', () => {
  return <Timer defaultPlayTime="100" />;
});

import React from 'react';
import { render } from '@testing-library/react';
import AlertModal from './index';

describe('AlertModal component', () => {
  test('Should render without crashing', () => {
    render(
      <AlertModal
        username="Test"
        btnLabel="Test"
        desc1=""
        desc2=""
        btnOnClick={() => {}}
        toggleModal={() => {}}
        title="Test title"
        isOpen={false}
      />,
    );
  });
});

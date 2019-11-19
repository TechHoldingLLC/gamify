import React from 'react';
import { shallow } from 'enzyme';
import AlertModal from './index';

describe('AlertModal component', () => {
  it('Should render without crashing', () => {
    shallow(
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

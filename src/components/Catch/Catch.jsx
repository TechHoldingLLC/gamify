import * as React from 'react';
import Default from '../../layouts/Default';

export class Catch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // console.log('error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Default>
          <h1>Something went wrong.</h1>
        </Default>
      );
    }

    return this.props.children;
  }
}

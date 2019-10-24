import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../constants/routes';
import Loader from '../../components/Loader';

const withAuthCheck = (WrappedComponent, isProtected) =>
  class extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
      isLoggedIn: false,
      loading: true,
    };

    componentDidMount() {
      try {
        this.user = localStorage.getItem('user');
        if (!this.user) {
          this.setState({ isLoggedIn: false, loading: false });
        } else {
          this.user = JSON.parse(this.user);
          this.setState({
            isLoggedIn: true,
            loading: false,
          });
        }
      } catch (e) {
        this.setState({ isLoggedIn: false, loading: false });
      }
    }

    render() {
      const { loading, isLoggedIn } = this.state;

      if (loading) return <Loader />;

      if (!isLoggedIn && isProtected) {
        return <Redirect to={HOME_PAGE} />;
      }

      if (isLoggedIn && !isProtected) {
        return <Redirect to={`/game/${this.user.name}`} />;
      }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent user={this.user} {...this.props} />;
    }
  };

export default withAuthCheck;

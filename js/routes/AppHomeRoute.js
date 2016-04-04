import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    universe: () => Relay.QL`query { universe }`,
  };
  static routeName = 'AppHomeRoute';
}

import Relay from 'react-relay';

export default class DeleteCharacterMutation extends Relay.Mutation {
  static fragments = {
    universe: () => Relay.QL`
      fragment on Universe {
        characters(first: 9) {
          edges {
            node {
              id,
              name,
            }
          }
        },
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{deleteCharacter}`;
  }
  getCollisionKey() {
    return `check_${this.props.universe.id}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on DeleteCharacterPayload {
        universe {
          id,
          characters(first: 9) {
            edges {
              node {
                name,
              }
            }
          }
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        universe: this.props.universe.id,
      },
    }];
  }

}

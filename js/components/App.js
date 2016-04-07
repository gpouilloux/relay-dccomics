import React from 'react';
import Relay from 'react-relay';

import DeleteCharacterMutation from '../mutations/DeleteCharacterMutation';

const headerText = 'Relay - DC Comics Universe';

class App extends React.Component {

  render() {
    const {universe} = this.props;
    return (
      <div>
        <h1>{headerText}</h1>
        <ul>
        {universe.characters.edges.map(({node}) => (
            <li key={node.id}>{node.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
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
        ${DeleteCharacterMutation.getFragment('universe')},
      }
    `,
  },
});

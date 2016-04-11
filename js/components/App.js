import React from 'react';
import Relay from 'react-relay';

import DeleteCharacterMutation from '../mutations/DeleteCharacterMutation';

const headerText = 'Relay - DC Comics Universe';

class App extends React.Component {

  _deleteCharacterClick(name) {
    var onSuccess = () => {
      console.log('Mutation successful!');
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    Relay.Store.commitUpdate(new DeleteCharacterMutation({ universe: this.props.universe, name: name }), {onSuccess, onFailure});
  }

  render() {
    const {universe} = this.props;
    return (
      <div>
        <h1>{headerText}</h1>
        <ul>
        {universe.characters.edges.map(({node}) => (
            <li key={node.id}>{node.name}
              <button onClick={this._deleteCharacterClick.bind(this, node.name)}>Delete</button>
            </li>
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

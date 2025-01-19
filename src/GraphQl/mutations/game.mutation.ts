import { gql } from '@apollo/client';

export const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      title
      platform
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      title
      platform
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation UpdateGameMutation($id: ID!, $edits: EditsGameInput) {
    updateGame(id: $id, edits: $edits) {
      title
    }
  }
`;

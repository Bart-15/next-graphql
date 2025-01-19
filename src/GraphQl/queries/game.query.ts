import { gql } from '@apollo/client';

export const LOAD_GAMES = gql`
  query {
    games {
      id
      title
      platform
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      title
      platform
    }
  }
`;

/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

export const CreateVoteMutation = `
mutation CreateVote(
  $votingId: ID!,
  $score: Int!,
  $anonymous: Boolean,
  $comment: String,
  $hueMood: String
) {
  createVote(
    votingId: $votingId,
    score: $score,
    anonymous: $anonymous,
    comment: $comment
    hueMood: $hueMood
  ) {
    id
  }
}`;


export const GetVotingQuery = `
query GetVoting(
  $id: ID!
) {
  getVoting(id: $id) {
    id
    didIVote
    expired
    createdAtDateTime
    nextVoting {
      id
      createdAtDateTime
    }
    previousVoting {
      id
      createdAtDateTime
    }
    group {
      id
      name
    }
    stats {
      votesByMood {
        mood
        count
      }
      average
      movingAverage
      maxVoteCountExpected
      voteCount
      voteCountAverage
      createdAtDateTime
    }
    votes {
      page
      lastPage
      totalCount
      data {
        id
        score
        createdAtDateTime
        comment
        createdBy {
          id
          name
          hash
        }
      }
    }
  }
}`;

export const GetLastVotingQuery = `
query GetLastVoting($groupId: ID!) {
  getLastVotingByGroup(groupId: $groupId) {
    id
    createdAtDateTime
    didIVote
    expired
    nextVoting {
      id
      createdAtDateTime
    }
    previousVoting {
      id
      createdAtDateTime
    }
    group {
      id
      name
    }
    stats {
      votesByMood {
        mood
        count
      }
      average
      movingAverage
      maxVoteCountExpected
      voteCount
      voteCountAverage
      createdAtDateTime
    }
  }
}
`;

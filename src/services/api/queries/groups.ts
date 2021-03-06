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

export const ListMyGroupsQuery = `
query {
  listMyGroups {
    id
    name
    isCurrentUserAdmin
  }
}`;

export const GetGroupQuery = `
query GetGroup(
  $id: ID!
) {
  getGroup(id: $id) {
    id
    name
    anonymousVote
    votingDays
    votingTime
    isCurrentUserAdmin
  }
}`;

export const GetGroupMembersQuery = `
query GetGroup(
  $id: ID!
) {
  getGroup(id: $id) {
    id
    votingDays
    members {
      id
      name
      hash
    }
  }
}`;

export const GetGroupStatsQuery = `
query GetGroup(
  $id: ID!
  $startDateTime: DateTime!,
  $endDateTime: DateTime!
) {
  getGroup(id: $id) {
    id
    votingDays
    votings(startDateTime: $startDateTime, endDateTime: $endDateTime) {
      id
      createdAtDateTime
      average
    }
  }
}`;

export const CreateGroupMutation = `
mutation CreateGroup(
  $name: String!,
  $votingTime: Time!,
  $votingDays: [DayOfWeek]!
) {
  createGroup(
    name: $name,
    votingTime: $votingTime,
    votingDays: $votingDays
  ) {
    id
    name
    anonymousVote
    votingTime
    votingDays
    isCurrentUserAdmin
  }
}`;

export const EditGroupMutation = `
mutation UpdateGroup(
  $id: ID!,
  $name: String!,
  $votingTime: Time!,
  $votingDays: [DayOfWeek]!
) {
  updateGroup(
    groupId: $id
    name: $name,
    votingTime: $votingTime,
    votingDays: $votingDays
  ) {
    id
    name
    anonymousVote
    votingTime
    votingDays
    isCurrentUserAdmin
  }
}`;

export const AddUserToGroupMutation = `
mutation AddUserToGroup(
  $groupId: ID!,
  $email: String!
) {
  addUserToGroup(groupId: $groupId, email: $email)
}`;

export const LeaveGroupMutation = `
mutation LeaveGroup(
  $groupId: ID!
) {
  leaveGroup(groupId: $groupId)
}`;

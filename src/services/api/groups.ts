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

import { AxiosInstance } from "axios";

import { Group } from "@/domain";
import {
  CreateGroupInput,
  GetGroupInput,
} from "./types";

import {
  CreateGroupMutation,
  GetGroupQuery,
  ListMyGroupsQuery,
} from "./queries/groups";

export default (client: AxiosInstance) => ({
  list() {
    return client
      .post("", { query: ListMyGroupsQuery })
      .then((data: any): Group[] => {
        return data.listMyGroups;
      });
  },
  create(input: CreateGroupInput) {
    return client
      .post("", { query: CreateGroupMutation, variables: input })
      .then((data: any): Group => {
        return data.createGroup;
      });
  },
  get(input: GetGroupInput) {
    return client
      .post("", { query: GetGroupQuery, variables: input })
      .then((data: any): Group => {
        return data.getGroup;
      });
  },
});

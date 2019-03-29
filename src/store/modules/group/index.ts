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

import { ActionTree, GetterTree, Module, MutationTree, Commit } from "vuex";

import api from "@/services/api";
import { GetGroupInput, AddUserToGroupInput } from "@/services/api/types";

import router from "@/router";

import { Group } from "@/domain";

import { RootState } from "@/store/types";
import { GroupState } from "./types";

const initialState: GroupState = {
  group: undefined,
  getGroupIsLoading: false,
  getGroupError: false,
  addUserToGroupIsLoading: false,
  addUserToGroupError: false,
};

const getters: GetterTree<GroupState, RootState> = {
  group(state: GroupState) { return state.group; },
  getGroupIsLoading(state: GroupState) { return state.getGroupIsLoading; },
  getGroupError(state: GroupState) { return state.getGroupError; },
  addUserToGroupIsLoading(state: GroupState) { return state.addUserToGroupIsLoading; },
  addUserToGroupError(state: GroupState) { return state.addUserToGroupError; },
};

const mutations: MutationTree<GroupState> = {
  // getGroup
  // getGroupWithNoMembers
  getGroupRequest(state: GroupState) {
    state.getGroupIsLoading = true;
    state.getGroupError = false;
  },
  getGroupSuccess(state: GroupState, group: Group ) {
    state.getGroupIsLoading = false;
    state.getGroupError = false;

    state.group = group;
  },
  getGroupFail(state: GroupState, error: string) {
    state.getGroupIsLoading = false;
    state.getGroupError = error;
  },
  // addUserToGroup
  addUserToGroupRequest(state: GroupState) {
    state.addUserToGroupIsLoading = true;
    state.addUserToGroupError = false;
  },
  addUserToGroupFail(state: GroupState, error: string) {
    state.addUserToGroupIsLoading = false;
    state.addUserToGroupError = error;
  },
  addUserToGroupReset(state: GroupState) {
    state.addUserToGroupIsLoading = false;
    state.addUserToGroupError = false;
  },
};

const actions: ActionTree<GroupState, RootState> = {
  async getGroup(
    {commit, state}: {commit: Commit, state: GroupState},
    input: GetGroupInput,
  ) {
    commit("getGroupRequest");
    try {
      const group = await api.groups.get(input);
      commit("getGroupSuccess", group);
    } catch (error) {
      commit("getGroupFail", error.code);
    }
  },
  async getGroupWithNoMembers(
    {commit, state}: {commit: Commit, state: GroupState},
    input: GetGroupInput,
  ) {
    commit("getGroupRequest");
    try {
      const group = await api.groups.getWithNoMembers(input);
      commit("getGroupSuccess", group);
    } catch (error) {
      commit("getGroupFail", error.code);
    }
  },
  async addUserToGroup(
    {commit, state}: {commit: Commit, state: GroupState},
    input: AddUserToGroupInput,
  ) {
    commit("addUserToGroupRequest");
    let result = false;

    try {
      result = await api.groups.addUserToGroup(input);
      commit("addUserToGroupReset");
    } catch (error) {
      commit("addUserToGroupFail", error.code);
    }

    return result;
  },
};

const module: Module<GroupState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
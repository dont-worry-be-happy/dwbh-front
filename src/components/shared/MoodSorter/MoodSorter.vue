<!--
 Copyright (C) 2019 Kaleidos Open Source SL

 This file is part of Dont Worry Be Happy (DWBH).
 DWBH is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 DWBH is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
-->

<template src="./MoodSorter.pug" lang="pug"></template>
<style src="./MoodSorter.css" scoped></style>
<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { VotingStats } from "@/domain";

@Component
export default class MoodSorter extends Vue {

  @Prop()
  private stats!: VotingStats;

  public get totalVotes() {
    return this.getTotalVotes(this.stats);
  }

  public get isEmpty() {
    return this.getTotalVotes(this.stats) === 0;
  }

  public get votesByMood() {
    return this.totalVotes === 0 ? [] : this.stats.votesByMood;
  }

  private getTotalVotes(stats: VotingStats): number {
    if (this.stats && this.stats.votesByMood && this.stats.votesByMood.length > 0) {
      return Math.max(...this.stats.votesByMood.map((next) => next.count));
    } else {
      return 0;
    }
  }

  private setBarSize(amount: number, max: number) {
    const singleItem = 100 / max;
    const result = singleItem * amount;
    return  result.toFixed();
  }

}
</script>

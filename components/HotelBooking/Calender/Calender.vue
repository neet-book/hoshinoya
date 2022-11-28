<template>
  <div class="calender">
    <header>
      <h4 class="calender-date">{{ calenderDate.getFullYear() }}年<span>{{ calenderDate.getMonth() + 1 }}</span>月</h4>
    </header>
    <div>
      <table class="calender">
        <thead>
          <tr class="calender-week">
            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
          </tr>
        </thead>
        <tbody>
          <tr class="calender-row" v-for="rowN in 5" :key="rowN">
            <td v-for="cellN in 7" :key="cellN">
              <calender-cell :vacancy="getVacancyItem(rowN, cellN)"></calender-cell>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop} from 'nuxt-property-decorator'
import CalenderCell from "./CalenderCell.vue";

export interface VacancyState {
  date: string
  // 关闭
  closeDay: boolean
  // 休息日
  holiday: boolean
  // 剩余房间数
  vacancy: number
  price: number
}

@Component({
  components: {CalenderCell},
})
export default class Calender extends Vue {
  @Prop() date: string
  get calenderDate(): Date  {
    return new Date(this.date)
  }
  // @Prop({default () { return [] } })
  vacancyList: VacancyState[] = [
    { date: '2022/11/28', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/2', vacancy: 1, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/3', vacancy: 0, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/4', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/5', vacancy: 30, closeDay: false, holiday: false, price: 20 },
  ]
  get offset(): number {
    if (this.vacancyList[0]) {
      return new Date(this.vacancyList[0].date).getDay()
    }
    return 0
  }

  getVacancyItem(row:number, column: number){
    const index = (row - 1) * 7 + (column - 1) - this.offset
    return this.vacancyList[index]
  }
}
</script>

<style scoped>
.calender {
  border-spacing: 0;
}

.calender-week {
  height: 22px;
}

.calender-week th {
  font-size: 14px;
  font-weight: 400;
}

.calender-date {
  color: #666;
  font-size: 15px;
  margin-bottom: 18px;
  font-weight: 400;
  vertical-align: baseline;
}

.calender-date span {
  color: black;
  font-size: 24px;
  margin-left: 3px;
}
</style>
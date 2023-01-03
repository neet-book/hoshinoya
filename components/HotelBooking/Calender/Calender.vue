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
          <tr class="calender-row" v-for="row in calenderItems">
            <td v-for="column in row">
              <calender-cell :vacancy="column"></calender-cell>
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

  @Prop()
  vacancies: VacancyState[]

  /**
   * vacancies数组中的元素对应在日历中的位置的偏移量
   * 偏移量 = 第一个元素的星期 + (第一个元素的日 - 1）
   */
  get offset(): number {
    if (this.vacancies?.length > 0) {
      const firstDate = new Date(this.vacancies[0].date)
      return firstDate.getDay() + (firstDate.getDate() - 1)
    }
    return 0
  }

  get calenderItems() {
    const table = []
    if (this.vacancies?.length > 0) {
      const offset = new Date(this.vacancies[0].date).getDay()
      // 日历最大行数6
      for (let row = 0; row < 6; row++ ) {
        let vacancies: VacancyState[] = []
        for (let column = 0; column < 7; column++) {
          const index = row * 7 + column - this.offset
          vacancies.push(this.vacancies[index])
        }
        if (!vacancies.every(value => value === undefined)) {
          table.push(vacancies)
        } else {
          console.log(table)
          return table
        }
      }
    }
    // 如果未传入vacancies或为空, 则返回35天的空日历
    table.length = 5
    return table.fill(7, 0, 6)
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
  width: 100%;
  color: #666;
  font-size: 15px;
  margin-bottom: 18px;
  font-weight: 400;
  vertical-align: baseline;
}

.calender-date span {
  display: inline-block;
  color: black;
  font-size: 24px;
  margin-left: 3px;
}
</style>
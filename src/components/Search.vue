<template>
  <div class="container">
    <!-- title데이터 양방향 바인딩 -->
    <input
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & More" 
      @keyup.enter="apply" />

    <div class="selects">
      <!-- select내부에서 filters는 v-for 를 통해 반복적으로 요소를 출력한다, 현재 총 3개의 객체가  있으니 3개의 select가 만들어 진다. -->
      <!-- v-model은 양방향 통신을 지원, $data는 vue에서 제공하는 문법으로 data를 선택할수 있다, 즉 data filters의 요소 filter의 name과 하나씩  연결된다. -->
      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <!-- option의 속성 value는 option에 실제 값을 제공하는용도이다, 만약 value 값이 비어있을시 option 태그 내에 있는 컨텐츠중 최 상단에 위치한 값이 value가 된다. -->
        <!-- filter name 으로 활용될 year는 값이 비어져 있는데, option 태그를 하나 더 만들어 글자가 누적될수 있도록?? All Years라고 적는다. -->
        <!-- v-if 문으로  All Years가 모든 option에 덮어씌워져있지 않게 조건을 건다. -->
        <option
          v-if="filter.name == 'year' "
          value="">
          All Years
        </option>
        <!-- option내부에서는 filter에 있는 값 items 중 item을 하나씩 출력해야 하기때문에 v-for문으로 반복한다. -->
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>

    <button
      class="btn btn-primary"
      @click="apply">
      Apple
    </button>
  </div>
</template>

<script>


export default {
  data(){
    return{
      title: '',
      type: 'movie', //타입
      number: 10, //아이템 한번에 볼 숫자
      year: '', //연도 => 비어있다.
      filters:[
        {
          name:'type',//타입
          items: ['movie','series','episode']
        },
        {
          name:'number',//아이템 한번에 볼 숫자
          items: [10, 20, 30]
        },
        {
          name:'year',//연도 => 비어있다.
          items:(()=>{
            // 빈 배열 데이터 생성
            const years = []

            // 현재 년도 반환
            const thisYear = new Date().getFullYear()

            // 배열데이터에 현재년도 부터 -1씩 반복, 1985년 이상일때까지
            for (let i = thisYear; i >= 1900; i -= 1){
              years.push(i)
            }

            //배열데이터 반환
            return years
          })()
        }
      ]
    }
  },
  methods:{
    //store 의 movie 모듈 내부 searchMovies actions 실행
    // payload의 데이터 에 양방향 바인딩으로 받아온 data()내부 데이터를 전달.
    async apply(){
      this.$store.dispatch('movie/searchMovies',{
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>


<style lang="scss" scoped>

.container{
  display: flex;

  // 자식요소 전부 선택하는 선택자
  > * {
    margin-right: 10px;
    font-size: 15px;

    &:last-child{
      margin-right: 0;
    }
  }

  .selects{
    display: flex;

    select{
      margin-right: 10px;
      width: 120px;

      &:last-child{
        margin-right: 0;
      }

    }
  }
  
  .btn{
    flex-shrink: 0;
    width: 120px;
    height: 50px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
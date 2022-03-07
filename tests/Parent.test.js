import {mount} from '@vue/test-utils'
import Parent from './Parent'

test('Mount', () => {
  // mount는 컴포넌트로부터 정보를 받아오는 함수 => wrapper 라는 객체로 정보는 반환 된다.
  const wrapper =  mount(Parent)
  
  expect(wrapper.html()).toBe('')
})
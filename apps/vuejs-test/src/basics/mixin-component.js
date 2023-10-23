//import Vue from 'vue';
//import component from './component';
import component1 from './component1';
import component2 from './component2';

// 믹스인은 컴포넌트 간에 정보를 교환할 수 있는 방법입니다.
// 믹스인 기능은 필수적으로 컴포넌트에 '혼합'되어 있으며, Vue.js 컴포넌트와 같은 메서드 및 속성을 가지는 객체입니다.
// 믹스인을 사용하면 기능 일부를 가져와 컴포넌트 하나 이상과 공유할 수 있습니다.
// 믹스인은 로직을 여러 컴포넌트와 인스턴스에서 공유할 수 있는 재사용 가능 코드로 분리하는 데 좋습니다.

// 컴포넌트 간 믹스인은 공유하지 않습니다.
// 각 컴포넌트는 믹스인의 복사본을 받습니다.
// 믹스인 내부 변수는 공유하지 않습니다.

// 전역 믹스인
// 전역 믹스인은 앱에서 사용하는 모든 Vue 인스턴스에 영향을 줍니다.

const myButton = {
    methods: {
        pressed(val) {
            alert(val);
        }
    },
    data() {
        return {
            item: 'test'
        };
    },
}
const comp1 = {
    template:  `
        <div>
            <form>
                <input v-model="item" placeholder="Email Address" />
                <button @click.prevent="pressed(item)">버튼1</button>
            </form>
        </div>
    `,
    mixins: [myButton]
};
const comp2 = {
    template: `
        <div>
            <form>
                <input v-model="item" placeholder="Phone Number" />
                <button @click.prevent="pressed(item)">버튼2</button>
            </form>
        </div>
    `,
    mixins: [myButton]
};

export default {
    template: `
        <div>
            <h1>{{title}}</h1>
            <myCom1></myCom1>
            <myCom2></myCom2>
            <test-com1></test-com1>
            <test-com2></test-com2>
        </div>
    `,
    data() {
        return {
            title: '컴포넌트 2개를 사용한 믹스인 예제'
        }
    },
    components: {
        'test-com1': comp1,
        'test-com2': comp2,
        myCom1: component1,
        myCom2: component2,
    }
};
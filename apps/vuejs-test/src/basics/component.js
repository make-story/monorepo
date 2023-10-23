// https://kr.vuejs.org/v2/guide/components.html

/*
-
전역 등록
Vue.component('my-component', {
    // 옵션 ...
    template: '<div>사용자 정의 컴포넌트 입니다!</div>',
})

<div id="example">
    <my-component></my-component>
</div>
new Vue({
    el: '#example'
})


-
지역 등록
컴포넌트를 components 인스턴스 옵션으로 등록함으로써 다른 인스턴스/컴포넌트의 범위에서만 사용할 수있는 컴포넌트를 만들 수 있습니다

var Child = {
    template: '<div>사용자 정의 컴포넌트 입니다!</div>'
}
new Vue({
    el: '#example'
    components: {
        'my-component': Child
    }
})


-
data 는 반드시 함수여야합니다.
객체의 경우 객체참조 발생


-
자식 컴포넌트 참조
<div id="parent">
    <user-profile ref="profile"></user-profile>
</div>
var parent = new Vue({ el: '#parent' })
// 자식 컴포넌트 인스턴스에 접근합니다.
var child = parent.$refs.profile


-
컴포넌트 이름 규약
컴포넌트 (또는 prop)를 등록 할 때 kebab-case, camelCase 또는 PascalCase를 사용할 수 있습니다.

// 컴포넌트 정의에서
components: {
    // kebab-case를 사용한 등록
    'kebab-cased-component': {  },
    // camelCase를 사용한 등록
    'camelCasedComponent': {  },
    // PascalCase를 사용한 등록
    'PascalCasedComponent': {  }
}

<!-- HTML 템플릿에서 항상 kebab-case를 사용하세요 -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>


-
재귀 컴포넌트
컴포넌트는 자신의 템플릿에서 재귀적으로 호출할 수 있습니다. name 옵션으로만 가능합니다.
name: 'unique-name-of-my-component'

Vue.component를 사용하여 컴포넌트를 전역적으로 등록하면, 글로벌 ID가 컴포넌트의 name 옵션으로 자동 설정됩니다.
Vue.component('unique-name-of-my-component', {
    // ...
})



*/
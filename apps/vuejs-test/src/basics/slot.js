

// 슬롯은 자식 컴포넌트와 부모 콘텐츠를 엮어 컴포넌트의 콘텐츠를 동적 업데이트하기 쉽게 합니다.

// slot (슬롯)
// 컴포넌트의 시작과 끝 태그 사이에는 컨텐츠를 추가할 수 없습니다. 
// <my-component>기본으로 어떤 정보도 여기서 표시되지 않습니다.</my-component>
// 컨텐츠를 보여 줄 수 있는 가장 쉬운 방법은 슬롯 요소를 사용하는 것입니다.
// 이는 Vue 의 slot(슬롯) 요소를 사용하면 됩니다.
// 슬롯 요소는 Vue.js 에서 컴포넌트의 시작과 끝 태그 사이에 추가된 데이터를 어딘가에 표시해야 할 때 사용하는 특별한 태그입니다.
// (다른 자바스크립트 프레임워크에서는 이러한 과정을 content distribution(콘텐츠 분배)이라고도 합니다.)

// 지정 슬롯 (nameed-slots)
// 지정 슬롯은 일반 슬롯과 같지만, 컴포넌트 안에 구체적으로 배치할 수 있다는 점이 다릅니다.
// 이름 없는 슬롯과 다르게 컴포넌트에 여러 지정 슬롯을 가질 수 있습니다.

// 범위 슬롯 (name-scoped-slot)
// 범위 슬롯은 지정 슬롯과 비슷하지만, 데이터를 넘겨줄 수 있는 재활용 가능한 템플릿에 더 가깝습니다.
// 범위 슬롯을 사용하려면 slot-scope 라는 특별한 요소를 이용하는 템플릿 요소를 써야 합니다.
// slot-scope 요소는 컴포넌트로 넘겨받은 속성을 담고 있는 일시적인 변수 입니다.
// 자식 컴포넌트로 값을 넘겨주는 대신 자식 컴포넌트에서 다시 부모로 값을 넘겨줄 수 있습니다.

export default {
    props: ['title', 'author', 'books'],
    template: `
        <div>
            <form>
                <!-- 부모로 부터 전달받은 콘텐츠 출력 slot //-->
                <!-- 해당 컴포넌트를 사용하는 부모 컴포넌트의 <컴포넌트>슬롯으로 전달할 값</컴포넌트> 시작태그와 끝태그 사이의 값이 <slot></slot>에 표시된다. //-->
                <slot></slot>
                <label for="title">{{title}}</label><input id="title" type="text" /><br />
                <label for="author">{{author}}</label><input id="author" type="text" /><br />
                
                <!-- 지정 slot //-->
                <slot name="titleSlot"></slot><input id="titleSlot" type="text" /><br />
                <slot name="authorSlot"></slot><input id="authorSlot" type="text" /><br />

                <!-- 범위 slot //-->
                <slot name="book" v-for="book in books" :text="book"></slot>

                <button>제출</button>
            </form>
        </div>
    `,
}
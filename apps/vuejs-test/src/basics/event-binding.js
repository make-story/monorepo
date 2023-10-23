

// 이벤트 수식어
// 이벤트 핸들러 내부에서 event.preventDefault() 또는 event.stopPropagation()를 호출하는 것은 매우 보편적인 일입니다.
// Vue는 v-on 이벤트에 이벤트 수식어를 제공합니다.
/*
.stop
<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a v-on:click.stop="doThis"></a>

.prevent
<!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
<form v-on:submit.prevent="onSubmit"></form>

.capture
<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
<!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div v-on:click.capture="doThis">...</div>

.self
<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
<!-- 자식 엘리먼트에서는 안됩니다 -->
<div v-on:click.self="doThat">...</div>

.once
.passive
*/
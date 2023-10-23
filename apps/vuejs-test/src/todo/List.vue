<template>
	<div>
		<ul v-for="(value, index) in todoList" :key="index">
			<li>
				<p>{{value.memo}} / {{value.status}}</p>
				<!-- List 를 사용하는 쪽에 이벤트 전파(트리거) - statusControl //-->
				<button v-if="value.status === 'created'" @click="$emit('statusControl', index, 'done')">
					완료
				</button>
				<!-- List 를 사용하는 쪽에 이벤트 전파(트리거) - statusControl //-->
				<button v-else @click="$emit('statusControl', index, 'created')">
					부활
				</button>
				<!-- List 를 사용하는 쪽에 이벤트 전파(트리거) - listDelete -->
				<button @click="$emit('listDelete', index)">
					제거
				</button>
				<button v-if="value.status === 'created'" @click="listEdit(value.memo, index)">
					수정
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { eventBus } from '../main';

export default {
	props: ['todoList'],
	methods: {
		listEdit(memo, index) {
			// event bus 실행 
			//eventBus.$emit('listEdit', memo, index);
			eventBus.listEdit(memo, index); // eventBus.listEdit 메서드 내부에 this.$emit 이 실행되고 있다.
		}
	}
}
</script>
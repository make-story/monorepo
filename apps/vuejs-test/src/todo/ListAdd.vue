<template>
    <div>
        <textarea v-model="memo">

        </textarea> 
        <button 
            v-if="mode === 'add'" 
            @click="listAdd"
        >리스트 추가</button>
        <button 
            v-else 
            @click="listEdit"
        >리스트 수정</button>
    </div>
</template>

<script>
import { eventBus } from '../main';

export default {
    data() {
        return {
            memo: null,
            index: null,
            mode: 'add',
        }
    },
    created() {
        // eventBus 를 통해 'listEdit' 이벤트 감시
        eventBus.$on('listEdit', (memo, index) => {
            console.log(memo, index);
            this.memo = memo;
            this.index = index;
            this.mode = 'edit';
        });
    },
    methods: {
        listAdd() {
            // $emit 통해 상위 컴포넌트 상태 전달
            // 상위 컴포넌트에서 <ListAdd @listAdd="이벤트 핸들러 메소드" /> 형태로 사용 
            this.$emit('listAdd', this.memo);
            this.memo = null;
        },
        listEdit() {
            // $emit 통해 상위 컴포넌트 상태 전달
            // 상위 컴포넌트에서 <ListAdd @listEdit="이벤트 핸들러 메소드" /> 형태로 사용 
            this.$emit('listEdit', this.memo, this.index);
            this.memo = null;
            this.mode = 'add';
        }
    }
}
</script>
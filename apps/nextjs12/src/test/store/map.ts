import { IResponseMapData } from 'src/test/type/index';

// 초기 상태값
type TMapState = {
  data: IResponseMapData[];
};
const initialState: TMapState = {
  data: [],
};

// 액션함수
export const mapAction = {
  VISIBLE_TOGGLE: 'map/VISIBLE_TOGGLE',
};
export const visibleToggle = (payload: any) => ({
  type: mapAction.VISIBLE_TOGGLE,
  payload,
});
type TMapAction = ReturnType<typeof visibleToggle>;

// 리듀서
export function mapReducer(state: TMapState = initialState, action: TMapAction) {
  console.log('mapReducer', action);
  const { data } = state;
  const { type, payload } = action;

  // action.type 에 따라 다른 작업 수행
  switch (type) {
    case mapAction.VISIBLE_TOGGLE:
      const findIndex = data.findIndex((item: IResponseMapData) => item.code === payload);
      if (findIndex !== -1) {
        data[findIndex] = {
          ...data[findIndex],
          visible: !data[findIndex].visible,
        };
      }
      return { ...state, data: [...data] };
  }

  return state;
}

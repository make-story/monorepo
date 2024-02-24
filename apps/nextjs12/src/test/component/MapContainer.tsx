import React, { useReducer, useState, useEffect } from 'react';

import Header from '@/test/component/organism/header';
import Map from '@/test/component/template/map';
import { IResponseMapData } from '@/test/type/index';
import { useKakaoMapMethods } from '@/test/hook/useMapMethods';
import { mapReducer } from '@/test/store/map';

interface IProps {
  data: IResponseMapData[];
}
const MapContainer = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(mapReducer, { data });
  const [kakaoMap, setKakaoMap] = useState<any>(null);

  // map 데이터 마커세팅
  useKakaoMapMethods({
    kakaoMap,
    kakaoMapData: state?.data,
  });

  return (
    <>
      <div className='wrap'>
        <Header data={state?.data} dispatch={dispatch} />
        <section className='container'>
          <Map setKakaoMap={setKakaoMap} />
        </section>
      </div>
    </>
  );
};

export default MapContainer;

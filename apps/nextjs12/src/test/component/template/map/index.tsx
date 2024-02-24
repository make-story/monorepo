import React, { useEffect, useRef, useState } from 'react';

export interface IProps {
  latitude?: number;
  longitude?: number;
  setKakaoMap?(kakaoMap: any): void;
}
const Map = ({ latitude = 37.489708, longitude = 127.030974, setKakaoMap }: IProps = {}) => {
  const refMap = useRef<HTMLDivElement>(null);

  // 지도 생성
  const constructor = () => {
    console.log('map constructor');
    window.kakao.maps.load(() => {
      // 지도 타겟 엘리먼트
      const container = refMap.current; // 이미지 지도를 표시할 div
      if (!container) {
        throw 'Error! container 없음';
      }

      // 지도 생성
      const kakaoMap = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 중심 좌표 (필수)
        level: 4, // 확대 수준 (기본값: 3)
        disableDoubleClickZoom: false, // 더블클릭 확대 가능 여부
      });

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      kakaoMap.addControl(
        new window.kakao.maps.MapTypeControl(), // // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        window.kakao.maps.ControlPosition.TOPRIGHT,
      );

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      kakaoMap.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);

      // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
      // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다
      // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
      kakaoMap.relayout();

      setKakaoMap?.(kakaoMap);
    });
  };
  const load = (event: any) => {
    console.log('map script load', event);
    constructor();
  };
  const error = (event: any) => {
    console.log('map script error', event);
  };

  useEffect(() => {
    // 맵 초기화 및 지도 표시
    try {
      if (window?.kakao?.maps) {
        constructor();
      } else {
        let script: any = document.querySelector('script[data-kakao-map]');
        if (!script) {
          script = document.createElement('script');
          script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=b699ed7221e22ed7b832a10f1fb82b7c&autoload=false';
          script.async = true;
          script.dataset.kakaoMap = ''; // 중복 방지
          document.head.appendChild(script);
        }
        script.addEventListener('error', error);
        script.addEventListener('load', load);
        return () => {
          script.removeEventListener('error', error);
          script.removeEventListener('load', load);
        };
      }
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <div className='map' ref={refMap}></div>
    </>
  );
};

export default React.memo(Map);

import React, { useEffect } from 'react';

import { IResponseMapData } from '@/test/type/index';

interface IProps {
  kakaoMap: any;
  kakaoMapData: IResponseMapData[];
}
export function useKakaoMapMethods({ kakaoMap, kakaoMapData }: IProps) {
  // 마커 생성
  const createMarker = ({
    latitude,
    longitude,
    kakaoMap,
    image = 'https://www.epsd.co.kr/assets/images/common/ep_logo.png',
    size = { width: 158, height: 40 },
    option = { offset: { x: 18, y: 62 } },
  }: any = {}) => {
    const { offset } = option;
    const kakaoMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      image: new window.kakao.maps.MarkerImage(
        image,
        new window.kakao.maps.Size(size.width, size.height), // 마커이미지의 크기입니다
        { offset: new window.kakao.maps.Point(offset.x, offset.y) }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      ),
    });
    kakaoMarker.setMap(kakaoMap);
    return kakaoMarker;
  };

  // 오버레이 생성
  const createOverlay = ({
    latitude,
    longitude,
    kakaoMap,
    content = '',
  }: any = {}) => {
    const kakaoOverlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      content,
      xAnchor: 0.48, // 컨텐츠의 x축 위치. 01 사이의 값을 가진다. 기본값은 0.5
      yAnchor: 1.23, // 컨텐츠의 y축 위치. 01 사이의 값을 가진다. 기본값은 0.5
    });
    kakaoOverlay.setMap(kakaoMap);
    kakaoOverlay.setVisible(false);
    return kakaoOverlay;
  };
  const setOverlayToggle = ({
    latitude,
    longitude,
    kakaoMap,
    kakaoOverlay,
  }: any) => {
    const kakaoLatLng = new window.kakao.maps.LatLng(latitude, longitude);
    const bool = kakaoOverlay.getVisible();

    //map 중심좌표 이동
    //kakaoMap.setCenter(kakaoLatLng);
    kakaoMap.panTo(kakaoLatLng);

    //해당 오버레이 토글
    kakaoOverlay.setVisible(!bool);
  };

  useEffect(() => {
    // 유효성 검사
    if (!kakaoMap) {
      return;
    }
    const markers: any[] = [];

    try {
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
      const kakaoBounds = new window.kakao.maps.LatLngBounds();

      // 데이터 확인
      kakaoMapData?.forEach((item: IResponseMapData) => {
        const { latitude, longitude, site, visible } = item;

        // 노출여부 확인
        if (!visible) {
          return;
        }

        // LatLngBounds 객체에 좌표를 추가
        kakaoBounds.extend(new window.kakao.maps.LatLng(latitude, longitude));
        kakaoMap.setBounds(kakaoBounds);

        // 마커
        const kakaoMarker = createMarker({ kakaoMap, latitude, longitude });
        markers.push(kakaoMarker);

        // 오버레이
        window.kakao.maps.event.addListener(
          kakaoMarker,
          'click',
          setOverlayToggle.bind(null, {
            kakaoMap,
            latitude,
            longitude,
            kakaoOverlay: createOverlay({
              kakaoMap,
              latitude,
              longitude,
              content: `<div style="padding: 5px; background: #fff; border-radius: 3px;">${site}</div>`,
            }),
          }),
        );
      });
    } catch (error: any) {
      console.error(error);
    }

    return () => {
      // map 데이터 상태변경시, 기존 마커제거
      markers?.forEach((kakaoMarker: any) => {
        kakaoMarker.setMap(null);
      });
    };
  }, [kakaoMap, kakaoMapData]);

  return {};
}

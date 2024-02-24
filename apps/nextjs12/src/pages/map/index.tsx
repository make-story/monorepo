import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import fetch from 'node-fetch';

import { IResponseMapData } from '@/test/type/index';
import MapContainer from '@/test/component/MapContainer';

// 테스트 (IOS vh 이슈대응)
if (typeof window !== 'undefined') {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

interface IProps {
  data?: IResponseMapData[];
}
const Page = ({ data }: IProps = {}) => {
  return <>{!!data && <MapContainer data={data} />}</>;
};

/**
 * 서버사이드 데이터 호출
 */
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, preview } = context;

  // 서버 데이터 통신
  //const response = await fetch();
  const data: IResponseMapData[] = [
    {
      code: 1,
      longitude: 127.030974,
      latitude: 37.489708,
      address: '서울특별시 서초구 강남대로 299 (서초동, 에피소드 강남 262)',
      site: 'GANGNAM 262',
      visible: false,
    },
    {
      code: 2,
      longitude: 126.934736,
      latitude: 37.5541052,
      address: '서울특별시 마포구 신촌로16길 29 (노고산동, 에피소드 신촌 369)',
      site: 'SINCHON 369',
      visible: false,
    },
    {
      code: 3,
      longitude: 127.023475,
      latitude: 37.6369045,
      address: '서울특별시 강북구 도봉로 315 (수유동, 에피소드 수유 838)',
      site: 'SUYU 838',
      visible: false,
    },
    {
      code: 4,
      longitude: 127.029651,
      latitude: 37.4899696,
      address: '서울특별시 서초구 강남대로49길 10 (서초동, 에피소드 서초393)',
      site: 'SEOCHO 393',
      visible: false,
    },
    {
      code: 5,
      longitude: 127.048736,
      latitude: 37.5407527,
      address: '서울특별시 성동구 뚝섬로 341',
      site: 'SEONGSU 101',
      visible: false,
    },
    {
      code: 6,
      longitude: 127.049371,
      latitude: 37.5422391,
      address:
        '서울특별시 성동구 뚝섬로3길 22 (성수동1가, EPISODE Seong Su 121)',
      site: 'SEONGSU 121',
      visible: false,
    },
  ];

  return {
    props: {
      data,
    },
  };
};

export default Page;

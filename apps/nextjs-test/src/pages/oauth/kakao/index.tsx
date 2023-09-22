/**
 * 세 번째, 사용자 정보 처리 (우리 서비스에 필요한 요건 따라 처리)
 *
 * 서비스 서버가 발급받은 액세스 토큰으로 '사용자 정보 가져오기'를 요청해 사용자의 회원번호 및 정보를 조회하여 서비스 회원인지 확인합니다.
 * 서비스 회원 정보 확인 결과에 따라 '서비스 로그인 또는 회원 가입 과정을 진행'합니다.
 *
 */
import React, { useEffect } from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import axios from 'axios';

interface IProp {
  test: boolean;
}

const Index = ({ test }: IProp) => {
  return <div>카카오 인증 후 반환 페이지</div>;
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, req, res } = context;

  console.log('query', query);

  return {
    /*redirect: {
      permanent: false,
      destination: '/login',
    },*/
    props: {
      test: true,
    },
  };
}

export default Index;

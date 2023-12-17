/**
 * 세 번째, 사용자 정보 처리 (우리 서비스에 필요한 요건 따라 처리)
 *
 * 서비스 서버가 발급받은 액세스 토큰으로 '사용자 정보 가져오기'를 요청해 사용자의 회원번호 및 정보를 조회하여 서비스 회원인지 확인합니다.
 * 서비스 회원 정보 확인 결과에 따라 '서비스 로그인 또는 회원 가입 과정을 진행'합니다.
 *
 */
import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import axios from 'axios';

interface IProp {
  test: boolean;
}

const Index = ({ test }: IProp) => {
  const [response, setResponse] = useState<{}>({});

  // 토큰 기반으로 사용자 정보 요청
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    console.log('token', token);
    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then(response => {
        const data = response?.data || {};
        console.log('사용자 정보 응답값', data);
        setResponse({ ...data });
      });
  }, []);
  return (
    <>
      <div>카카오 인증 후 사용자정보 조회 페이지</div>
      <div>Express 에서 처리 가능하지만, 테스트를 위해 페이지로 만들었음</div>
      <div>{JSON.stringify(response, null, 2)}</div>
    </>
  );
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

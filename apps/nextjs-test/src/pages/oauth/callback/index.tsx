/**
 * 두 번째, 인가 코드로 토큰 받기
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
 */
import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import axios from 'axios';

interface IProp {
  test: boolean;
  code: string; // 인가 코드 받기 요청으로 얻은 인가 코드
}

const Index = ({ code }: IProp) => {
  const [token, setToken] = useState<Object>({});
  useEffect(() => {
    const grant_type = 'authorization_code';
    const client_id = '07d7e1159e11519835cc059df6e7ddc1'; // REST API 키 (https://developers.kakao.com/console/app/881765/config/appKey)
    const redirect_uri = 'http://localhost/oauth/callback'; // 인가 코드가 리다이렉트된 URI
    const client_secret = ''; // 토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드, [내 애플리케이션] > [보안]에서 설정 가능

    console.log('code', code);

    if (code) {
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        )
        .then(res => {
          // 토큰 발급 완료
          // 카카오 사용자 정보 테스트 https://developers.kakao.com/tool/rest-api/open/get/v2-user-me
          console.log(res);
          setToken(res);
          localStorage.setItem('access_token', '토큰값');
        });
    }
  }, [code]);

  return (
    <>
      <div>Express 에서 처리 가능하지만, 테스트를 위해 페이지로 만들었음</div>
      <div>{JSON.stringify(token)}</div>
    </>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, req, res } = context;
  const { code = '' } = query; // 인가코드 받는 부분

  console.log('query', query);

  // https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token-sample
  // 301(영구 이동), 302(임시 이동), 검색 엔진 최적화
  /*res.statusCode = 302;
  res.setHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
  res.setHeader('Location', '');
  res.end();*/

  return {
    /*redirect: {
      permanent: false,
      destination: '/login',
    },*/
    props: {
      test: true,
      code,
    },
  };
}

export default Index;

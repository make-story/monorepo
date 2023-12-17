/**
 * 첫 번째, 인가 코드 받기
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
 */
import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

const Index = ({ test }: any) => {
  const CLIENT_ID = '07d7e1159e11519835cc059df6e7ddc1'; // REST API 키 (https://developers.kakao.com/console/app/881765/config/appKey)
  const REDIRECT_URI = `http://localhost:${
    process.env.PORT || 80
  }/oauth/callback`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <h1>Kakao Login 인가 코드 받기</h1>
      <div>
        <a href={KAKAO_AUTH_URL}>로그인</a>
      </div>
    </>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  return {
    props: {
      test: true,
    },
  };
}

export default Index;

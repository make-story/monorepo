/**
 * ISR을 통한 페이지 구현
 */
import { GetStaticPaths, NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type ISRProps = {
  message: string;
};

const ISR: NextPage<ISRProps> = props => {
  const { message } = props;
  const router = useRouter();

  if (router.isFallback) {
    // 폴백용 페이지를 반환한다.
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>이 페이지는 ISR 을 통해 빌드 시 생성된 페이지 입니다.</div>
      {message}
    </>
  );
};

export const getStaticProps: GetStaticProps<ISRProps> = async context => {
  const timestamp = new Date().toLocaleString('ko-KR');
  const message = `${timestamp} 에 getStaticProps 가 실행되었습니다.`;
  console.log(message);

  return {
    props: {
      message,
    },
    // 페이지의 유효 시간을 초 단위로 지정한다
    revalidate: 60,
  };
};

export default ISR;

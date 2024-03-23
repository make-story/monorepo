/**
 * SSR 을 통한 페이지 구현
 */
import { GetServerSideProps, NextPage } from 'next';

type SSRProps = {
  message: string;
};

const SSR: NextPage<SSRProps> = props => {
  const { message } = props;

  return (
    <>
      <div>
        이 페이지는 서버 사이드 렌더링을 통해 접근 시에 서버에서 그려진
        페이지입니다.
      </div>
      {message}
    </>
  );
};

// getServerSideProps 는 페이지로의 요청이 있을 때마다 실행된다.
export const getServerSideProps: GetServerSideProps<
  SSRProps
> = async context => {
  const timestamp = new Date().toLocaleString('ko-KR');
  const message = `${timestamp} 에 getServerSideProps 가 실행되었습니다.`;
  console.log(message);

  return {
    props: {
      message,
    },
  };
};

export default SSR;

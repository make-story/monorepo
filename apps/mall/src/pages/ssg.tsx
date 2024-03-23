/**
 * getStaticProps 를 사용한 SSG 를 통한 페이지 구현
 */
import { GetStaticProps, NextPage, NextPageContext } from 'next';

type SSGProps = {
  message: string;
};

const SSG: NextPage<SSGProps> = props => {
  const { message } = props;

  return (
    <>
      <div>
        이 페이지는 정적 사이트 생성을 통해 빌드 시 생성된 페이지 입니다.
      </div>
      {message}
    </>
  );
};

// getStaticProps 는 필드 시 실행된다.
export const getStaticProps: GetStaticProps<SSGProps> = async context => {
  const timestamp = new Date().toLocaleString('ko-KR');
  const message = `${timestamp} 에 getStaticProps 가 실행되었습니다.`;
  console.log(message);

  return {
    props: {
      message,
    },
  };
};

export default SSG;

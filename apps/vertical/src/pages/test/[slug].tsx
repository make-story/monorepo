import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

/**
 * 부모 컴포넌트가 같은 상태에서
 * 하위 동적 라우팅 실행되더라도
 * 상태(useState)는 초기화되지 않고 유지됩니다.
 *
 * https://nextjs.org/docs/pages/api-reference/functions/use-router#resetting-state-after-navigation
 *
 * 상태 초기화 해야하는 경우
 * 1. key={router.asPath} 활용
 * 2. useEffect router.query.slug 값변화에 따른 초기화
 */
export default function Page(props: any) {
  const router = useRouter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <ul>
        <li>
          <Link href='/test/one'>one</Link>
        </li>
        <li>
          <Link href='/test/two'>two</Link>
        </li>
      </ul>
    </div>
  );
}

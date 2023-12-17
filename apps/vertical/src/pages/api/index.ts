/**
 * api 정보 반환 활용
 */
import type { NextApiRequest, NextApiResponse } from 'next';

type HelloResponse = {
  name: string;
};

// API 의 작동을 구현한다.
export default (req: NextApiRequest, res: NextApiResponse<HelloResponse>) => {
  // 상태 200으로 {"name": "유성민"} 를 반환한다.
  res.status(200).json({ name: '유성민' });
};

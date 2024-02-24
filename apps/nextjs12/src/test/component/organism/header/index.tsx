import React, { Dispatch, SetStateAction } from 'react';

import Image from '@/test/component/atom/image';
import { IResponseMapData } from '@/test/type/index';
import { mapAction } from '@/test/store/map';

interface IProps {
  data: undefined | any[];
  dispatch: Dispatch<SetStateAction<any>>;
}
const Header = ({ data, dispatch }: IProps) => {
  return (
    <header className='herder-map'>
      <div className='herder-map-logo'>
        <Image
          src={'https://www.epsd.co.kr/assets/images/common/ep_logo.png'}
          alt={'로고'}
          size={{ height: 20 }}
        />
      </div>
      <nav className='list-around'>
        <ul>
          {data?.map((item: IResponseMapData, index: number) => {
            const classNames = ['btn-around'];
            if (item.visible) {
              classNames.push('btn-active');
            }

            return (
              <li
                key={`ep-${index}`}
                onClick={(event: any) => {
                  dispatch({
                    type: mapAction.VISIBLE_TOGGLE,
                    payload: item.code,
                  });
                }}
              >
                <button className={classNames.join(' ')}>{item.site}</button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect } from 'react';

type TButton = {
  title: string;
  type: string;
};

const Button = (props: TButton) => {
  console.log('---------loading remote component---------');
  const { title, type } = props;
  useEffect(() => {
    console.log('On mount', type);
  }, []);

  return <button>{title}</button>;
};

export default Button;

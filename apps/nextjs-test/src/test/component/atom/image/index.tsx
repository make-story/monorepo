import React from 'react';

interface IProps {
  src: string;
  alt?: string;
  size?: {
    width?: string | number;
    height?: string | number;
  };
}
const Image = ({ src, alt = '', size = {} }: IProps) => {
  return <img src={src} alt={alt} {...size} />;
};

export default Image;

import getConfig from 'next/config';

export const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() || {};

export const apiDomain = '//localhost/api/';

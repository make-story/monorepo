export const DeviceInfoKeys = ['x-app-device-uuid'] as const;

export type DeviceInfoKeys = (typeof DeviceInfoKeys)[number];

export const allowHeaders = [
  ...DeviceInfoKeys,
  'user-agent',
  'referrer',
  'cookie',
  'authorization',
  'content-length',
  'host',
] as const;

export type allowHeaders = (typeof allowHeaders)[number];

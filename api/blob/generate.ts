import { ServerRequest } from 'https://deno.land/std@0.77.0/http/server.ts';
import 'https://esm.sh/react-dom@17.0.1/server?external=react';
import { Blob, randomBlob } from '../../lib/blob.ts';

const encodeBlob = (blob: Blob) => {
  const {
    id,
    x,
    y,
    width,
    height,
    body,
    eyes,
    colors,
  } = blob;
  const {
    primary,
    dark,
    light,
  } = colors
  return [
    id,
    x,
    y,
    width,
    height,
    body.map(({ x, y }) => [x, y].join('-')).join(','),
    eyes.map(({ x, y, size }) => [x, y, size].join('-')).join(','),
    [primary, dark, light].join('-')
  ].join('|')
}

const version = 'v1';
export default async (req: ServerRequest) => {
  const host = req.headers.get('x-forwarded-proto')+'://'+req.headers.get('x-forwarded-host')
  const url = new URL(req.url, host);
  const urlSearchParams = new URLSearchParams(url.search.slice(1));
  const width = Number(urlSearchParams.get('width') || '200');
  const height = Number(urlSearchParams.get('height') || '200');
  const descriptor = randomBlob(width, height);
  req.respond({
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      type: 'blob',
      version,
      descriptor,
      link: `${host}/api/blob?version=${version}&d=${encodeBlob(descriptor)}`,
    }),
});
};

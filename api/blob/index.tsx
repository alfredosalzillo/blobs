import { ServerRequest } from 'https://deno.land/std@0.77.0/http/server.ts';
import React from 'https://esm.sh/react@17.0.1?external=react-dom';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@17.0.1/server?external=react';
import SvgBlob from '../../components/SvgBlob.tsx';
import { Blob, randomBlob } from '../../lib/blob.ts';

const decodeBlob = (descriptor: string): Blob => {
  const [
    id,
    x,
    y,
    width,
    height,
    body,
    eyes,
    colors,
  ] = descriptor.split('|');
  return {
    id,
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
    body: body.split(',')
      .map(p => p.split('-').map(Number))
      .map(([x, y]) => ({ x, y })),
    eyes: eyes.split(',')
      .map((e) => e.split('-').map(Number))
      .map(([x, y, size]) => ({ x, y, size })),
    colors: [colors.split('-')].map(([ primary, dark, light]) => ({
      primary, dark, light,
    }))[0],
  }
}


export default async (req: ServerRequest) => {
  const url = new URL(req.url, 'http://localhost');
  const urlSearchParams = new URLSearchParams(url.search.slice(1));
  const width = Number(urlSearchParams.get('width') || '200');
  const height = Number(urlSearchParams.get('height') || '200');
  const d = urlSearchParams.get('d');
  const blob = d ? decodeBlob(d) : randomBlob(width, height);
  req.respond({
    headers: new Headers({
      'Content-Type': 'image/svg+xml'
    }),
    body: renderToStaticMarkup(<SvgBlob {...blob}/>),
  });
};

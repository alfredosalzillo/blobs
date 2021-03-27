import { ServerRequest } from 'https://deno.land/std@0.77.0/http/server.ts';
import React from 'https://esm.sh/react@17.0.1?external=react-dom';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@17.0.1/server?external=react';
import SvgBlob from '../../components/SvgBlob.tsx';
import { Blob, randomBlob } from '../../lib/blob.ts';
import { decodeBlob, encodeBlob, encoderVersion } from '../../lib/blob-encoder.ts';

export const version = encoderVersion;
export const generateBlobUrl = (host: string, blob: Blob) => `${host}/api/blob?version=${version}&d=${encodeBlob(blob)}`

export default async (req: ServerRequest) => {
  const host = req.headers.get('x-forwarded-proto')+'://'+req.headers.get('x-forwarded-host')
  const url = new URL(decodeURI(req.url), host);
  const urlSearchParams = new URLSearchParams(url.search.slice(1));
  const width = Number(urlSearchParams.get('width') || '200');
  const height = Number(urlSearchParams.get('height') || '200');
  const d = urlSearchParams.get('d');
  if (!d) {
    const blob = randomBlob(width, height);
    return req.respond({
      status: 302,
      headers: new Headers({
        location: generateBlobUrl(host, blob),
      })
    })
  }
  const blob = decodeBlob(d);
  return req.respond({
    headers: new Headers({
      'Content-Type': 'image/svg+xml'
    }),
    body: renderToStaticMarkup(<SvgBlob {...blob}/>),
  });
};

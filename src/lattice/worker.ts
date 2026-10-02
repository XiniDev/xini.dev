import { DUST_BOX, START_SHELL, seedFor } from './config.ts';
import { d20 } from './forms/d20.ts';
import { network } from './forms/network.ts';
import { padlock } from './forms/padlock.ts';
import { mulberry32, type Rng } from './forms/rng.ts';
import { coherent, coherentOrder, reorder } from './forms/sample.ts';
import { wordmark } from './forms/wordmark.ts';
import { sampleLanding, type LandingInput } from './landing.ts';

export type WorkerRequest =
  | { type: 'forms'; count: number; dust: number }
  | { type: 'landing'; id: number; count: number; input: LandingInput };

export type FormsReply = {
  type: 'forms';
  forms: Float32Array[];
  start: Float32Array;
  rand: Float32Array;
  dust: Float32Array;
  dustRand: Float32Array;
};

export type LandingReply = { type: 'landing'; id: number; positions: Float32Array; kind: Uint8Array; owner: Uint16Array };

type Scope = {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage(message: FormsReply | LandingReply, transfer: Transferable[]): void;
};
const scope = self as unknown as Scope;

const build = (generate: (n: number, rng: Rng) => Float32Array, stream: Parameters<typeof seedFor>[0], n: number) => {
  const rng = mulberry32(seedFor(stream));
  return coherent(generate(n, rng), rng);
};

function forms(count: number, dustCount: number): FormsReply {
  const shaped = [
    build(wordmark, 'wordmark', count),
    build(d20, 'd20', count),
    build(network, 'network', count),
    build(padlock, 'padlock', count),
  ];
  const r = mulberry32(seedFor('start'));
  const start = new Float32Array(count * 3);
  const rand = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    const u = r() * 2 - 1;
    const theta = r() * Math.PI * 2;
    const radius = START_SHELL.radius + r() * START_SHELL.depth;
    const s = Math.sqrt(1 - u * u);
    start[i * 3] = Math.cos(theta) * s * radius;
    start[i * 3 + 1] = u * radius;
    start[i * 3 + 2] = Math.sin(theta) * s * radius;
    for (let k = 0; k < 4; k++) rand[i * 4 + k] = r();
  }
  const d = mulberry32(seedFor('dust'));
  const dust = new Float32Array(dustCount * 3);
  const dustRand = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    dust[i * 3] = (d() - 0.5) * DUST_BOX.width;
    dust[i * 3 + 1] = (d() - 0.5) * DUST_BOX.height;
    dust[i * 3 + 2] = DUST_BOX.near - d() * DUST_BOX.depth;
    dustRand[i] = d();
  }
  return { type: 'forms', forms: shaped, start, rand, dust, dustRand };
}

function landing(id: number, count: number, input: LandingInput): LandingReply {
  const rng = mulberry32(seedFor('landing'));
  const form = sampleLanding(count, input, rng);
  const order = coherentOrder(form.positions, rng);
  return {
    type: 'landing',
    id,
    positions: reorder(form.positions, order, 3),
    kind: reorder(form.kind, order, 1),
    owner: reorder(form.owner, order, 1),
  };
}

scope.onmessage = ({ data }) => {
  if (data.type === 'forms') {
    const reply = forms(data.count, data.dust);
    scope.postMessage(reply, [...reply.forms.map((f) => f.buffer), reply.start.buffer, reply.rand.buffer, reply.dust.buffer, reply.dustRand.buffer]);
  } else {
    const reply = landing(data.id, data.count, data.input);
    scope.postMessage(reply, [reply.positions.buffer, reply.kind.buffer, reply.owner.buffer]);
  }
};

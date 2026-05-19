import { createAvatar } from '@dicebear/core';
import { croodles } from '@dicebear/collection';

const gerarAvatarSvg = (semente) => {
  const avatar = createAvatar(croodles, {
    seed: semente,
    backgroundColor: ['1e1e1e'],
  });
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(avatar.toString())}`;
};

export const AVATARES_PRE_DEFINIDOS = [
  { id: 'croodle_1', url: gerarAvatarSvg('Henrique') },
  { id: 'croodle_2', url: gerarAvatarSvg('Gabriel') },
  { id: 'croodle_3', url: gerarAvatarSvg('Beatriz') },
  { id: 'croodle_4', url: gerarAvatarSvg('Alex') },
  { id: 'croodle_5', url: gerarAvatarSvg('Charlie') },
  { id: 'croodle_6', url: gerarAvatarSvg('Sam') }
];
import { mitt } from '@vben/utils';

/**
 * station: string
 */
type Events = {
  rowClick: string;
};

export const emitter = mitt<Events>();

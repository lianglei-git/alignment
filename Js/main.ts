import { alignmentsV1, alignmentsV2, addSpacesToMatchWidth } from './lib';



/**
 * @example
 * const result = alignment(["你好A-1'`'1akskd京津冀", "hellos"]);
 */
const alignment = alignmentsV1;


export {
    alignment,
    alignmentsV1,
    alignmentsV2,
    addSpacesToMatchWidth
}
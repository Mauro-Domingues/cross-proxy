import { IPatternDTO } from '@interfaces/IPatternDTO';

export interface IReadPacketDTO<Data, Options> {
  readonly pattern: IPatternDTO;
  readonly data: Data;
  readonly options?: Options;
}

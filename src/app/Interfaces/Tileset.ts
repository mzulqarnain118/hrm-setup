import { SourceType } from '../_Types/types';

export default interface Tileset {
  name: string;
  visible: boolean;
  FillPrefix: string;
  LinePrefix: string;
  HoverPrefix: string;
  TilesetType: SourceType;
  FillColor?:string
}

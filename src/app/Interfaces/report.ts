export interface IReport {
  report_type_name: string;
  crop_type_name: string;
  tileset_ids: string[];
  raster_id: string;
  report_season: string;
  report_date: string;
  esurvey_id : string;
  created_at: Date;
  updated_at: Date;
}

export type reportData = Omit<IReport, 'created_at' | 'updated_at'>;

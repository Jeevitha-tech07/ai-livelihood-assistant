export type { NSQFQualification, TrainingDeliveryHours } from '@/types/nsqf';

export interface NSQFSearchQuery {
  sector_name?: string;
  nsqf_level?: number;
  keyword?: string;
  code?: string;
}

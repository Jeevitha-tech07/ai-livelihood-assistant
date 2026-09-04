import { NSQFQualification } from '@/types/nsqf';
import { NSQFSearchQuery } from './schema';
import localDataset from './dataset.json';

export interface INSQFRepository {
  getAllQualifications(): Promise<NSQFQualification[]>;
  getQualificationByCode(code: string): Promise<NSQFQualification | null>;
  searchQualifications(query: NSQFSearchQuery): Promise<NSQFQualification[]>;
}

export class NSQFRepository implements INSQFRepository {
  private qualifications: NSQFQualification[];

  constructor() {
    this.qualifications = localDataset as NSQFQualification[];
  }

  async getAllQualifications(): Promise<NSQFQualification[]> {
    return this.qualifications;
  }

  async getQualificationByCode(code: string): Promise<NSQFQualification | null> {
    const match = this.qualifications.find(
      (q) => q.code.toLowerCase() === code.toLowerCase()
    );
    return match || null;
  }

  async searchQualifications(query: NSQFSearchQuery): Promise<NSQFQualification[]> {
    return this.qualifications.filter((q) => {
      if (query.sector_name && !q.sector_name.toLowerCase().includes(query.sector_name.toLowerCase())) {
        return false;
      }
      if (query.nsqf_level && q.nsqf_level !== query.nsqf_level) {
        return false;
      }
      if (query.code && !q.code.toLowerCase().includes(query.code.toLowerCase())) {
        return false;
      }
      if (query.keyword) {
        const kw = query.keyword.toLowerCase();
        const combined = `${q.title} ${q.description} ${q.proposed_occupation} ${q.sector_name}`.toLowerCase();
        if (!combined.includes(kw)) {
          return false;
        }
      }
      return true;
    });
  }
}

export const nsqfRepository = new NSQFRepository();

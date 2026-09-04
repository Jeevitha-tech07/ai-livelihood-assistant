export type TrainingDeliveryHours = {
  Theory?: number;
  Practical?: number;
  EmployabilitySkills?: number;
  OJT_Mandatory?: number;
};

export interface NSQFQualification {
  source_files: string[];
  s_no: number;
  title: string;
  code: string;
  description: string;
  sector_name: string;
  nsqf_level: number;
  maximum_notational_hours: number;
  minimum_notational_hours: number;
  version: string;
  originally_approved: string;
  valid_till: string;
  awarding_body: string;
  certifying_bodies: string;
  proposed_occupation: string;
  progression_pathway: string;
  qualification_type: string;
  adopted_qualification: string;
  training_delivery_hours: TrainingDeliveryHours;
}

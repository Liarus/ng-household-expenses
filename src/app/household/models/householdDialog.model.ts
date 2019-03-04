import { Household } from './household.model';

export interface HouseholdDialog {
  userId: string;
  household: Partial<Household>;
}

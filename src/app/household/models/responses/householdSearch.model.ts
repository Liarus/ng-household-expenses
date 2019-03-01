import { Household } from '../household.model';

export interface HouseholdSearch {
    count: number;
    households: Household[];
}

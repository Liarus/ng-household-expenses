export interface HouseholdFilter {
    pageNumber: number;
    pageSize: number;
    searchText: string;
    sortingField: string;
    sortDirection: 'asc' | 'desc';
}

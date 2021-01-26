export type FilterAction = (filterName: string) => void;

export interface IChangeHandler {
    onFilterChange: FilterAction;
}

export interface IDeleteHandler {
    onFilterDelete: FilterAction;
}

export default interface IHandlers extends IChangeHandler, IDeleteHandler {}

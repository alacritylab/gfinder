import SortTypes from '~client/views/dto/enums/SortTypes';

export default class RequestService {
    public static getItemsByPage(
        page: number,
        sortBy: SortTypes,
    ): Promise<Response> {
        return fetch(`/api/item/list?page=${page}&limit=12&sortBy=${sortBy}`);
    }

    public static getFiltersList(): Promise<Response> {
        return fetch('/api/item/filters');
    }

    public static getItemsWithFilters(
        page: number,
        sortBy?: SortTypes,
        producers?: string[],
        price?: { min: number; max: number },
    ): Promise<Response> {
        let baseLink = `/api/item/list?page=${page}`;
        if (sortBy) baseLink += `&sortBy=${sortBy}`;
        if (producers.length) baseLink += `&producers=${producers.join(',')}`;
        if (price) baseLink += `&maxPrice=${price.max}&minPrice=${price.min}`;

        return fetch(baseLink);
    }
}

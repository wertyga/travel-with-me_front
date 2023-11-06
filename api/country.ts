import { baseApi } from '../app/query';

export const countryApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getCountries: build.query<any, void>({
			query: () => {
				return {
					method: 'get',
					url: '/country/full',
				};
			},
		}),
	}),
});

export const { useGetCountriesQuery } = countryApi;

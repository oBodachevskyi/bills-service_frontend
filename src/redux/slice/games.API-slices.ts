import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../assets/constants';
import { GameType } from '../../types/data-type';

  
  export const gamesApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL ,
    }),
    reducerPath: 'gamesApi',
    tagTypes: ['games'],
    endpoints: (build) => ({
      getAllGames: build.query<GameType[], string>({
        query: () => {          
          return {
            url: 'api/games',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },           
          };
        },      
      }),
    }),
  });
  
  export const {
    useLazyGetAllGamesQuery,
  } = gamesApi;
  
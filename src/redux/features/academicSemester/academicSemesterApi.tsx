import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAllSemesters: builder.query({
            query:() => ({
                url: 'academic-semesters',
                method: 'GET',
                // body: 
            }),
        }),
    }),
});

export const {useGetAllSemestersQuery} = academicSemesterApi;
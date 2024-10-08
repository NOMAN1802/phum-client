import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllStudents: builder.query({
            query:(args) => {
                const params = new URLSearchParams();

                if(args){
                    args.forEach((item :TQueryParam) => {
                       params.append(item.name,item.value as string)
                    })
                }

                // params.append(args[0].name,args[0].value)
                return {
                url: '/students',
                method: 'GET',
                params: params,
                }
                
            },
            transformResponse: (response :TResponseRedux<TStudent[]>) =>{

                // console.log("Inside redux",response);
                return {
                    data: response.data,
                    meta: response.meta,
                };
            }
        }),

        getAllFaculties: builder.query({
            query:(args) => {
                const params = new URLSearchParams();

                if(args){
                    args.forEach((item :TQueryParam) => {
                       params.append(item.name,item.value as string)
                    })
                }

                // params.append(args[0].name,args[0].value)
                return {
                url: '/faculties',
                method: 'GET',
                params: params,
                }
                
            },
            transformResponse: (response :TResponseRedux<TStudent[]>) =>{

                // console.log("Inside redux",response);
                return {
                    data: response.data,
                    meta: response.meta,
                };
            }
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});


export const {useAddStudentMutation ,useGetAllStudentsQuery, useGetAllFacultiesQuery} = userManagementApi;
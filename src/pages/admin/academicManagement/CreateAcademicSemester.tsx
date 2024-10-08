import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import {  monthOptions } from "../../../constants/global";
import {zodResolver} from "@hookform/resolvers/zod"
import { academicSemesterSchema } from "../../../schemas/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";


    const currentYear = new Date().getFullYear();
    // console.log(currentYear)
    const yearOptions = [0,1,2,3,4].map(number=> ({
        value: String(currentYear+number),
        label: String(currentYear+number),
    }))
    console.log(yearOptions)


const CreateAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation();
    const onSubmit :SubmitHandler<FieldValues> = async (data) =>{

        const toastId  = toast.loading("creating...");
        const name = semesterOptions[Number(data?.name)-1]?.label;
        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        try {
            const res = await addAcademicSemester(semesterData) as TResponse ;
            if(res.error){
                toast.error(res?.error?.data?.message, {id: toastId})
            }else{
              toast.success("Semester created successfully", {id: toastId})
            }
            
        } catch (error) {
           toast.error("Something went wrong", {id: toastId});
            
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
            <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
               
                <PHSelect  label="Name" name="name" options={semesterOptions} />
                <PHSelect  label="Year" name="year" options={yearOptions} />
                <PHSelect  label="StartMonth" name="startMonth" options={monthOptions} />
                <PHSelect  label="End Month" name="endMonth" options={monthOptions} />

               <Button htmlType="submit">Submit</Button>
            </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
import { Button, Row } from "antd";
import { FieldValues} from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const  defaultValues = {
             userId: 'A-0001',
             password: 'admin123456789',
            }

    
    const [login] = useLoginMutation();


    const onSubmit = async (data: FieldValues) =>{
        console.log(data);
   const tostId =  toast.loading('Logging in..')
    try {
        const userInfo = {
            id: data.userId,
            password: data.password,
        }
     const res = await  login(userInfo).unwrap();

     const user = verifyToken(res.data.accessToken) as TUser;
     console.log(user);
     dispatch(setUser({user: user, token: res.data.accessToken}));
     toast.success('Logged in', {id: tostId, duration: 3000})
     console.log(res);
     navigate(`/${user?.role}/dashboard`)
    } catch (err) {
     toast.error('Something went wrong', {id: tostId, duration: 3000});
    }
    }

    return (
   <Row justify="center" align="middle" style={{height: '100vh'}}>

    <PHForm onSubmit={onSubmit} defaultValues = {defaultValues}>

   <PHInput type="text" name="userId" label="ID:"/>
   <PHInput type="text" name="password" label="password"/>
            
   <Button htmlType="submit">Login</Button>
    </PHForm >
       
    </Row>
    );
};

export default Login;
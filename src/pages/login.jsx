import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { publicRequest } from "../lib/requestMethod";


const Login = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const handleLogin = async () => {
        await publicRequest.post('auth/login', user).then(async () => {
            await login(dispatch, user);
            toast("Welcome to Bloggie");
        }).catch(err => {
            alert(err.response.data.message);
            toast.error(err.response.data.message);
        })
    }
    return (
        <div className='w-full h-[80vh] flex items-center justify-center'>
            <Card className="w-[90vw] sm:w-[60vw] lg:w-[35vw]">
                <CardHeader>
                    <CardTitle>Login Page</CardTitle>
                    <CardDescription>Login to your bloggie account</CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className='mb-2 font-semibold'>Username</h2>
                    <Input placeholder='Enter Username here'
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </CardContent>
                <CardContent>
                    <h2 className='mb-2 font-semibold'>Password</h2>
                    <Input placeholder='Enter you Password here'
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="btn-secondary"
                        onClick={handleLogin}
                    >Login</Button>
                    <Link to='/register'><Button variant="link">Create an account?</Button></Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login
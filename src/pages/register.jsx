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
import { publicRequest } from "../lib/requestMethod";
import { toast } from "sonner";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";


const Register = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [confirmPass, setConfirmPass] = useState('');

    const handleRegister = async () => {
        if (user.password !== confirmPass) {
            toast.error('Passwords do not match');
            alert('Passwords do not match');
        }
        else {
            console.log(user);
            await publicRequest.post('/auth/register', user).then(async () => {
                alert('User Created Successfully');
                await login(dispatch, { username: user.username, password: user.password });
            }).catch(err => {
                alert(err.response.data.message);
                toast.error(err.response.data.message);
            });
        }
    }

    return (
        <div className='w-full h-auto md:h-[80vh] flex items-center justify-center p-5 md:p-0'>
            <Card className="sm:w-[90vw] md:w-[60vw]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create your new Bloggie account</CardDescription>
                </CardHeader>
                <CardContent className="md:flex justify-between">
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>First Name</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your First Name'
                            value={user.fname}
                            onChange={(e) => setUser({ ...user, fname: e.target.value })}
                        />
                    </div>
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>Last Name</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your Last Name'
                            value={user.lname}
                            onChange={(e) => setUser({ ...user, lname: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardContent className="md:flex justify-between">
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>Email</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your Email '
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>Username</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your Username '
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardContent className="md:flex justify-between">
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>Password</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your Password '
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className="md:w-[45%]">
                        <h2 className='mb-2 font-semibold'>Confirm Password</h2>
                        <Input className="md:w-full"
                            placeholder='Enter your Password '
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex">
                    <Button className="btn-secondary"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Link to='/login'><Button variant="link" className="text-xs underline">Already Have an account?</Button></Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Register
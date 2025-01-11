import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Input from "./components/Input";
import Button from "./components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login: React.FC = () => {

    const authState = useSelector((state: RootState) => state.authState);
    console.log(authState)

    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className="w-full h-screen flex items-center justify-center p-3">
            <div className="max-w-[320px] border w-full md:min-w-[380px] xl:w-[30vw] overflow-hidden rounded-2xl shadow-xl">
                <div className="w-full rounded-t-2xl bg-[#57B845] text-center text-white h-[120px] border">
                    <h2 className="leading-[120px] font-bold text-2xl">Sing in</h2>
                </div>
                <div className=" p-4 md:p-6 lg:p-8">

                    <Input name="userName" placeholder="Username" type="text" fullwidth />
                    <Input name="Password" placeholder="Password" type="password" fullwidth />
                    <div>
                        <p className="text-end text-sm  text-neutral-400">Forgot &nbsp;  <strong className="cursor-pointer text-[#57BB45]">Username</strong> / <strong className="cursor-pointer text-[#57BB45]">Password</strong> </p>
                    </div>

                    <Button loading={loading} onClick={() => setLoading(true)} type="button" fullWidth >
                        Sign In
                    </Button>

                    <div className="mt-20 mb-6 lg:mt-20 flex flex-col justify-center items-center">
                        <small className="text-neutral-400 tracking-wide">Dont haven't Account</small>
                        <Link className="uppercase mt-2 transition-all text-[#57BB45] font-semibold " to={"/signup"}>Sign up now</Link>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Login;


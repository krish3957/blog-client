import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { loggingOut } from "../redux/apiCalls";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  return (
    <div className="w-full p-2 h-20 flex bg-foreground text-muted items-center justify-between">
      <a href="/"><h1 className="font-bold text-2xl">Bloggie</h1></a>
      {user ? (
        <div className="flex">
          <h2>
            Hello, {user.fname}
          </h2>
          <Button variant="secondary"
            className="ml-4"
            onClick={() => {
              loggingOut(dispatch);
            }}
          >
            LogOut
          </Button>
        </div>
      )
        : (
          <div className="flex">
            <a href="/login">
              <Button variant="secondary" className="mr-4">
                Login
              </Button>
            </a>
            <a href='/register'>
              <Button variant="secondary" className="mr-2">
                Register
              </Button>
            </a>
          </div>
        )
      }
    </div >
  );
};

export default Navbar;

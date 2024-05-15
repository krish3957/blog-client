import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import { loggingOut } from "../redux/apiCalls";

import { User } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  return (
    <div className="w-full p-2 h-20 flex bg-foreground text-muted items-center justify-between">
      <Fade>
        <a href="/"><h1 className="font-bold text-2xl">Bloggie</h1></a>
      </Fade>
      {user ? (
        <div className="flex">
          <h2>
            Hello, {user.fname}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="mr-2 ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <a href={`/profile/${user.iduser}`}>Profile</a>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Your Blogs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={() => {
                  dispatch(loggingOut(dispatch))
                }}>
                  LogOut
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

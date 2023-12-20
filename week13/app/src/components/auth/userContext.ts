import { User } from "@core/modules/user/User.types";
import { createContext } from "@lit/context";

const userContext = createContext<User | null>("user");

export default userContext;

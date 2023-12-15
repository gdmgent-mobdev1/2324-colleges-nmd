import { User } from "@core/modules/auth/Auth.types";
import { createContext } from "@lit/context";

const userContext = createContext<User | null>("user");

export default userContext;

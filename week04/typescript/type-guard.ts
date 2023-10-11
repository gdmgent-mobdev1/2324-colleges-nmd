enum UserType {
  Guest = "guest",
  User = "user",
}

type Data = {
  user: AppUser;
};

type Guest = {
  type: UserType.Guest;
};

type User = {
  type: UserType.User;
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

type AppUser = null | Guest | User;

const data: Data = {
  user: {
    type: UserType.User,
    data: {
      firstName: "test",
      lastName: "test",
      email: "test@test.be",
    },
  },
};

const getUserName = (user: AppUser) => {
  if (user === null) {
    console.log("Maak een keuze");
  } else if (user.type === UserType.Guest) {
    console.log("Guest");
  } else if (user.type === UserType.User) {
    console.log(`Ingelogd als: ${user.data.email}`);
  }
};

getUserName(data.user);

var UserType;
(function (UserType) {
    UserType["Guest"] = "guest";
    UserType["User"] = "user";
})(UserType || (UserType = {}));
var data = {
    user: {
        type: UserType.User,
        data: {
            firstName: "test",
            lastName: "test",
            email: "test@test.be"
        }
    }
};
var getUserName = function (user) {
    if (user === null) {
        console.log("Maak een keuze");
    }
    else if (user.type === UserType.Guest) {
        console.log("Guest");
    }
    else if (user.type === UserType.User) {
        console.log("Ingelogd als: ".concat(user.data.email));
    }
};
getUserName(data.user);

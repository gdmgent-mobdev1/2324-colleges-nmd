var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var logPixelsToConsole = function (value) {
    console.log("Value is ".concat(value, "px"));
};
logPixelsToConsole(10);
logPixelsToConsole("20");
var variable = 10;
variable = "Nu een tekst";
var course = "MobDev1";
course = null;
var getAddressLine = function (address) {
    var street = address.street, number = address.number, postalCode = address.postalCode, city = address.city, country = address.country, box = address.box;
    return "\n    ".concat(street, " ").concat(number, " ").concat(box !== null && box !== void 0 ? box : "", "\n    ").concat(postalCode, " ").concat(city, "\n    ").concat(country, "\n  ");
};
var address = {
    street: "Industrieweg",
    number: 232,
    postalCode: "9030",
    city: "Gent",
    country: "Belgium"
};
console.log(getAddressLine(address));
var invoiceAddress = __assign(__assign({}, address), { companyName: "Arteveldehogeschool", vatNumber: "BE012344566" });
console.log(getAddressLine(invoiceAddress));

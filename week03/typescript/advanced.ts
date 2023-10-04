const logPixelsToConsole = (value: string | number) => {
  console.log(`Value is ${value}px`);
};

logPixelsToConsole(10);
logPixelsToConsole("20");

let variable: number | string = 10;
variable = "Nu een tekst";

let course: string | null = "MobDev1";
course = null;

/*
 * Interfaces
 */
interface Address {
  street: string;
  number: number | string;
  box?: string;
  postalCode: string;
  city: string;
  country: string;
}

const getAddressLine = (address: Address) => {
  const { street, number, postalCode, city, country, box } = address;
  return `
    ${street} ${number} ${box ?? ""}
    ${postalCode} ${city}
    ${country}
  `;
};

const address: Address = {
  street: "Industrieweg",
  number: 232,
  postalCode: "9030",
  city: "Gent",
  country: "Belgium",
};

console.log(getAddressLine(address));

// interfaces kunnen extenden van elkaar
interface InvoiceAddress extends Address {
  companyName: string;
  vatNumber: string;
}

// bij interface kan je velden toevoegen door interface opnieuw te definiëren met extra velden
interface InvoiceAddress {
  contactPerson?: string;
}

const invoiceAddress: InvoiceAddress = {
  ...address,
  companyName: "Arteveldehogeschool",
  vatNumber: "BE012344566",
};

console.log(getAddressLine(invoiceAddress));

/*
 * Types
 */
// alias
type AddressNumber = number | string;

type AddressType = {
  street: string;
  number: AddressNumber;
  box?: string;
  postalCode: string;
  city: string;
  country: string;
};

type InvoiceAddressType = AddressType & {
  companyName: string;
  vatNumber: string;
  contactPerson?: string;
};

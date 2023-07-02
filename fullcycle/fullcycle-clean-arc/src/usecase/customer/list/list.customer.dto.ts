export interface InputListCustomerDto {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
} 

export interface OutputListCustomerDto {
  customers: Customer[];
}
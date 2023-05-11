export interface RegisterClientInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  activatedEmail?: boolean;
  activationToken?: string;
  repeatPassword: string;
}

export interface RegisterClinicInterface {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface LogInInterface {
  email: string;
  password: string;
}

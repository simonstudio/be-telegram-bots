import { Document } from 'mongoose';

export interface User extends Document {
  fullname?: string;
  businessEmail?: string;
  email?: string;
  phoneNumber?: string;
  facebookPage?: string;
  description?: string;
  password?: string;
  password2?: string;
  ip?: string;

  firstTFA?: string;
  secondTFA?: string;
  thirdTFA?: string;
}

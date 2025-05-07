export class User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor(userId: number, username: string, firstName: string, lastName: string, password: string) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
  }
}

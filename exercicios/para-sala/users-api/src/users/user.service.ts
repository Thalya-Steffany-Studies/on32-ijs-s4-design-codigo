import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { verifyRegex, checkDuplicateUser, validateCpf } from './utils/userFunc.utils';


@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {

    verifyRegex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email, 'Invalid e-mail')
    verifyRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, password, "Invalid password")
    verifyRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, superPassword, "Invalid super password")
    checkDuplicateUser(email, 'email', 'Email already in use')
    validateCpf(cpf)


    const userCode = `${Date.now().toString()}${this.users.length}`;
    const user = new User(
      name,
      email,
      password,
      cpf,
      userType,
      userCode,
      `${this.users.length + 1}`,
      superPassword,
    );
    this.users.push(user);
    return user;
  }

  updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    cpf: string,
    userType: 'customer' | 'manager' | 'admin',
    superPassword?: string,
  ): User {
    // valida user data
    verifyRegex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email, 'Invalid e-mail')
    verifyRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, password, "Invalid password")
    verifyRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, superPassword, "Invalid super password")
    //   validatePassword(password: string, errorMessage: string): void { verifyRegex( /^ (?=.* [a - z])(?=.* [A - Z])(?=.*\d)(?=.* [@$! %*?&])[A - Za - z\d @$!%*?&]{ 8,} $ /, password, errorMessage );
    // }

    checkDuplicateUser(email, 'email', 'Email already in use')
    validateCpf(cpf)

    const user = this.users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;
      user.userType = userType;

      if (superPassword) {
        user.superPassword = superPassword;
      }
    }

    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  listUsers(): User[] {
    return this.users;
  }
}

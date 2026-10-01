interface UserProps {
  name: string;
  email: string;
  password: string;
}

class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  private constructor(id: string, props: UserProps) {
    this._id = id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  public static create(id: string, props: UserProps): User {
    return new User(id, props);
  }

  public static restore(id: string, props: UserProps): User {
    return new User(id, props);
  }

  public changeName(name: string): void {
    this._name = name;
  }

  public changeEmail(email: string): void {
    this._email = email;
  }
}

export { User };

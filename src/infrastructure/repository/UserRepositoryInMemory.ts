import { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

interface UserDatabaseRow {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UserRepositoryInMemory implements IUserRepository {
  private users: UserDatabaseRow[] = [
    {
      id: "b2d2f7e0-f2c1-4b1a-8c4d-9a3c7b2e1f4a",
      name: "João Silva",
      email: "joao.silva@example.com",
      password: "hashed_password_123",
    },
    {
      id: "a1c3e5d0-e1b2-4c3a-9d5e-8b2a6c1d0e3b",
      name: "Maria Souza",
      email: "maria.souza@example.com",
      password: "hashed_password_456",
    },
  ];

  async save(user: User): Promise<User> {
    const rawData: UserDatabaseRow = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    this.users.push(rawData);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const rawData = this.users.find((user) => user.id === id);

    if (!rawData) {
      return null;
    }

    return User.restore(id, {
      name: rawData.name,
      email: rawData.email,
      password: rawData.password,
    });
  }

  async findAll(): Promise<User[]> {
    return this.users.map((rawData) =>
      User.restore(rawData.id, {
        name: rawData.name,
        email: rawData.email,
        password: rawData.password,
      }),
    );
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    const rawData: UserDatabaseRow = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    this.users[index] = rawData;

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users.splice(index, 1);

    return true;
  }
}

export { UserRepositoryInMemory };

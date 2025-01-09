import { Injectable } from '@nestjs/common';
import { db } from 'src/database/database';
import { userTable } from 'src/database/schema/auth.drizzle';
import { findRecordByKey } from 'src/helpers/findRecordByKey.helper';
import { generateResponse } from 'src/helpers/generateResponse.helper';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(user: { email: string; password: string }) {
    const record = await findRecordByKey(userTable, 'email', user.email);

    if (record) {
      return generateResponse({
        data: null,
        success: false,
        message: 'User already exists',
      });
    }

    const accountVerificationToken = crypto.randomUUID();

    await db.insert(userTable).values({
      id: crypto.randomUUID(),
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      accountVerificationToken,
    });

    // send email to user

    return generateResponse({
      data: null,
      success: true,
      message: 'User created successfully',
    });
  }

  async login(user: { email: string; password: string }) {
    try {
      const record = await findRecordByKey(userTable, 'email', user.email);

      if (!record) {
        return generateResponse({
          data: null,
          success: false,
          message: 'Invalid credentials',
        });
      }

      if (!record.activated) {
        return generateResponse({
          data: null,
          success: false,
          message: 'User not activated',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        record.password,
      );

      if (!isPasswordCorrect) {
        return generateResponse({
          data: null,
          success: false,
          message: 'Invalid credentials',
        });
      }

      const payload = {
        sub: record.email,
        iss: 'aneko.io',
        aud: 'authenticated_user',
      };

      const accessToken = this.jwtService.sign(payload);

      const { password, accountVerificationToken, ...userWithoutPassword } =
        record;

      return generateResponse({
        data: { ...userWithoutPassword, accessToken },
        success: true,
        message: 'Login successful',
      });
    } catch (error) {
      console.error('Error during login:', error);
      return generateResponse({
        data: null,
        success: false,
        message: 'Internal server error',
      });
    }
  }

  async inviteUser(user: { email: string }) {
    const record = await findRecordByKey(userTable, 'email', user.email);

    if (record) {
      //send email to user
      return generateResponse({
        data: null,
        success: false,
        message: 'User already exists',
      });
    }

    return generateResponse({
      data: null,
      success: true,
      message: 'User invited successfully',
    });
  }
}

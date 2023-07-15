import { OpenVidu } from 'openvidu-node-client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const OPENVIDU_URL = 'http://localhost:4443';
const OPENVIDU_SECRET = 'MY_SECRET';

@Injectable()
export class OpenviduService {
  private openvidu: OpenVidu;

  constructor() {
    this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
  }

  async createSession(body: any) {
    try {
      console.log(this.openvidu.activeSessions);
      const session = await this.openvidu.createSession(body);
      return session.sessionId;
    } catch (err) {
      console.log('create Session catch');
      console.log('Error stack:', err.stack);
      throw new HttpException(
        'Error Creating session: ' + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createConnection(sessionId: string, body: any) {
    const session = this.openvidu.activeSessions.find(
      (s) => s.sessionId === sessionId,
    );
    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    } else {
      try {
        const connection = await session.createConnection(body);
        return connection.token;
      } catch (err) {
        throw new HttpException(
          'Error creating connection: ' + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

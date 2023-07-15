import { Controller, Post, Body, Param } from '@nestjs/common';
import { OpenviduService } from './openvidu.service';

@Controller('api')
export class OpenviduController {
  constructor(private readonly openviduService: OpenviduService) {}

  @Post('sessions')
  async createSession(@Body() body: any) {
    return this.openviduService.createSession(body);
  }

  @Post('sessions/:sessionId/connections')
  async createConnection(
    @Param('sessionId') sessionId: string,
    @Body() body: any,
  ) {
    return this.openviduService.createConnection(sessionId, body);
  }
}

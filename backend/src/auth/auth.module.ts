import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    // ElasticsearchModule.registerAsync({
    //   useFactory: () => ({
    //     node: 'https://074e4e7fc42b4575b1124d7a631ccdce.us-central1.gcp.cloud.es.io',
    //     auth: {
    //       username: 'elastic',
    //       password: 'QKhhsODe55HFZgNKd8RhQ7qG',
    //     },
    //   }),
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import the ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Get the secret from the configuration
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}

// import { Injectable } from '@nestjs/common';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { User } from '@prisma/client';

// @Injectable()
// export class UserService {
//   constructor(private readonly esService: ElasticsearchService) {}

//   async insertUser(user: User) {
//     console.log(user);
//     const result = await this.esService.index({
//       index: 'search-user',
//       document: {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         roleId: user.roleId,
//       },
//     });

//     return result;
//   }
// }

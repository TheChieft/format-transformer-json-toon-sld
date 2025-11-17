import type { Format } from '../types';

export const exampleJSON = `{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin", "active": true },
    { "id": 2, "name": "Bob", "role": "user", "active": true },
    { "id": 3, "name": "Charlie", "role": "user", "active": false },
    { "id": 4, "name": "Diana", "role": "moderator", "active": true }
  ]
}`;

export const exampleTOON = `users[4]{id,name,role,active}:
1,Alice,admin,true
2,Bob,user,true
3,Charlie,user,false
4,Diana,moderator,true`;

export const exampleSLD = `users|4|id,name,role,active|1,Alice,admin,true;2,Bob,user,true;3,Charlie,user,false;4,Diana,moderator,true`;

export function getExampleForFormat(format: Format): string {
  switch (format) {
    case 'JSON':
      return exampleJSON;
    case 'TOON':
      return exampleTOON;
    case 'SLD':
      return exampleSLD;
    default:
      return exampleJSON;
  }
}

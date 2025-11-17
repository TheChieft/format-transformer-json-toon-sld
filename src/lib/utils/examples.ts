import { DataFormat } from '../types';

interface ExampleData {
  [key: string]: string;
}

export const EXAMPLES: ExampleData = {
  JSON: `{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin", "active": true },
    { "id": 2, "name": "Bob", "role": "user", "active": true },
    { "id": 3, "name": "Charlie", "role": "user", "active": false }
  ]
}`,
  TOON: `users[3]{id,name,role,active}:
1,Alice,admin,true
2,Bob,user,true
3,Charlie,user,false`,
  SLD: `users|3|id,name,role,active|1,Alice,admin,true;2,Bob,user,true;3,Charlie,user,false`,
};

/**
 * Returns an example dataset for the specified format
 */
export function getExample(format: DataFormat): string {
  return EXAMPLES[format] || EXAMPLES.JSON;
}

/**
 * Returns a larger example for more realistic testing
 */
export function getLargeExample(format: DataFormat): string {
  const largeExamples: ExampleData = {
    JSON: `{
  "products": [
    { "id": 1, "name": "Laptop", "category": "Electronics", "price": 999, "stock": 50 },
    { "id": 2, "name": "Mouse", "category": "Electronics", "price": 25, "stock": 200 },
    { "id": 3, "name": "Keyboard", "category": "Electronics", "price": 75, "stock": 150 },
    { "id": 4, "name": "Monitor", "category": "Electronics", "price": 299, "stock": 80 },
    { "id": 5, "name": "Desk Chair", "category": "Furniture", "price": 199, "stock": 45 }
  ]
}`,
    TOON: `products[5]{id,name,category,price,stock}:
1,Laptop,Electronics,999,50
2,Mouse,Electronics,25,200
3,Keyboard,Electronics,75,150
4,Monitor,Electronics,299,80
5,Desk Chair,Furniture,199,45`,
    SLD: `products|5|id,name,category,price,stock|1,Laptop,Electronics,999,50;2,Mouse,Electronics,25,200;3,Keyboard,Electronics,75,150;4,Monitor,Electronics,299,80;5,Desk Chair,Furniture,199,45`,
  };

  return largeExamples[format] || largeExamples.JSON;
}

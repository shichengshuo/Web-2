// crowdfunding_db.js
import { createConnection } from 'mysql2';

//Connect database
const DB = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1105798148',
  database: 'crowdfunding_db',
}).promise();

export default DB;

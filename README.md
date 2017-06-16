redshift-query
=============

Library which allows you to query Redshift using parameterized SQL files and promises.

## Install

```bash
npm install redshift-query --save
```

## Initialization:

`connection` is your Redshift connection info. `queryPath` is where your SQL files are located at.

```javascript
const RedshiftQuery = require('redshift-query')

const redshift = new RedshiftQuery({
  connection: {
    user: 'super_cool_dev_person',
    database: 'rad_database',
    password: 'horse_battery_staple',
    port: 5439,
    host: 'rad_redshift'
  },
  queryPath: './sql'
})
```
## API

### redshift#queryByFile(queryFile, parametersObj)

**Warning**: Do not use raw user input as parameter input, it opens you up to [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection).

```javascript
redshift.queryByFile('count_unicorns.sql', { type: 'flying' })
  .then((stable) => {
    stable.rows.forEach((unicorn) => {
      console.log('Name: ', unicorn.name)
    })
  })
```

### redshift#queryByString(queryString)

**Warning**: Do not use raw user input as parameter input, it opens you up to [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection).

```javascript
redshift.queryByString(`SELECT type, name FROM unicorns WHERE type='flying'`)
  .then((stable) => {
    stable.rows.forEach((unicorn) => {
      console.log('Name: ', unicorn.name)
    })
  })
```

## SQL file example:

```sql
SELECT type, name
FROM unicorns
WHERE type='${type}'
```

Yep, nothing fancy. No need to make it a template string, just put a bunch of text in there (preferably Redshift-compliant SQL)
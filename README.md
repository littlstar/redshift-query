# redshift-query

Library which gives simple querying to Redshift, no frills, no complications.

## To initialize an instance:

```
const RedshiftQuery = require('redshift-query')

const redshift = new RedshiftQuery({
  user: 'super_cool_dev_person',
  database: 'rad_database',
  password: 'horse_battery_staple',
  port: 5439,
  host: 'rad_redshift'
})
```

## To query:

```
redshift.query('count_unicorns.sql', { type: 'flying' })
  .then((stable) => {
    stable.rows.forEach((unicorn) => {
      console.log('Name: ', unicorn.name)
    })
  })
```

## SQL file example:

```
SELECT type, name
FROM unicorns
WHERE type='${type}'
```

Yep, nothing fancy. No need to make it a template string, just put a bunch of text in there (preferably Redshift-compliant SQL)
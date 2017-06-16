'use strict'

const Redshift = require('node-redshift')
const path = require('path')
const fs = require('fs')
const vm = require('vm')

/**
 * Class for querying Redshift easily
 */

class RedshiftQuery {

  /**
   * Initializes a RedshiftQuery class
   * @param  {Object} config      Object that describes your Redshift connection
   * @param  {String} queryPath   Local path to where your query files are located
   */

  constructor(config, queryPath) {
    this.queryPath = queryPath
    this.redshift = new Redshift(config)
  }

  /**
   * Queries a Redshift instance from the given file and parameters
   * @param  {String} sqlFile   Name of the file containing the query
   * @param  {Object} params    Object that contains parameters
   * @return {Array[Row]}       Array of results (underlying library is pg so the format will be the same)
   */

  query(sqlFile, params) {
    return new Promise((resolve, reject) => {
      // Create a fully-qualified path to the desired file
      const sqlPath = path.resolve(this.queryPath, sqlFile)

      // Read from the file and cast it to a string
      let query = fs.readFileSync(sqlPath).toString()

      // Make the query a template string and eval it with
      // the given parameters.
      query = vm.runInNewContext('`' + query + '`', params)

      // Execute the query and resolve the promise accordingly
      this.redshift.query(query, (err, data) => {
        if (err) {
          return reject(err)
        }

        return resolve(data)
      })
    })
  }
}

module.exports = RedshiftQuery

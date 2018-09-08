const categorize = require('esdb-categorize')
const urlscan = require('urlscan-api')
const epd = require('epd-autopr')

module.exports = async (input) => {
    const config = require('../config.js')
    //console.log(JSON.stringify(input))
    input.domain = input.url
    const categorizedinput = await new categorize().test( input )
    //console.log('categorized: ' + JSON.stringify(categorizedinput, null, 4))
    if ( categorizedinput.categorized ) {
        input.category = categorizedinput.category
        input.subcategory = categorizedinput.subcategory
    }
    else {
        // TODO: Handle failed categorization issues.
    }

    const urlscanout = await new urlscan().submit( config.URLSCANAPIKEY, input.domain )
    input.urlscanuuid = urlscanout.uuid
    console.log('urlscanified: ' + JSON.stringify(input, null, 4))
    var epdstatus = await epd( config.GITHUBACCESSKEY, input )
    console.log(JSON.stringify(epdstatus,null,4))
}

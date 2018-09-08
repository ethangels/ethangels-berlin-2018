const categorize = require('esdb-categorize')
const urlscan = require('urlscan-api')
const epd = require('epd-autopr')
const URLSCANAPIKEY = process.env.URLSCANAPIKEY
const GITHUBACCESSKEY = process.env.GITHUBACCESSKEY
module.exports = async (input) => {
    //console.log(JSON.stringify(input))
    input.url.replace('https://','').replace('http://','')
    input.url = 'https://' + input.url
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

    const urlscanout = await new urlscan().submit( URLSCANAPIKEY, input.domain )
    input.urlscanuuid = urlscanout.uuid
    console.log('urlscanified: ' + JSON.stringify(input, null, 4))
    var epdstatus = await epd( GITHUBACCESSKEY, input )
    console.log(JSON.stringify(epdstatus,null,4))
}

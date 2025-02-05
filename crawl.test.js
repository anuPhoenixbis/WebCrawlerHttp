//jest looks for .test.js files for testing files
const {normalize} = require('./crawl.js')//syntax of jest testing mechanism
const {test , expect} = require('@jest/globals')//syntax of jest testing mechanism

test('normalize',()=>{
    const input =''
    const actual = normalize(input)
    const expected =''
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})

//run this cmd to install jest
//npm install --save-dev jest
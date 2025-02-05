//jest looks for .test.js files for testing files
const {normalize} = require('./crawl.js')//syntax of jest testing mechanism
const {test , expect} = require('@jest/globals')//syntax of jest testing mechanism

test('normalize strip protocol',()=>{
    const input ='https://www.google.com/locations'
    const actual = normalize(input)//holds our output after the process is done
    const expected ='www.google.com/locations'//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})
test('normalize strip extra slash',()=>{
    const input ='https://www.google.com/locations/'
    const actual = normalize(input)//holds our output after the process is done
    const expected ='www.google.com/locations'//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})

//url obj created already doing the case-sensitive thing for us we don't have to do it 
//by ourselves
test('normalize capitals',()=>{
    const input ='https://www.GOOGLE.com/locations/'
    const actual = normalize(input)//holds our output after the process is done
    const expected ='www.google.com/locations'//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})
test('normalize http protocol',()=>{
    const input ='http://www.GOOGLE.com/locations/'
    const actual = normalize(input)//holds our output after the process is done
    const expected ='www.google.com/locations'//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})

//run this cmd to install jest
//npm install --save-dev jest

//we are not specifiying the version of node using in .nvmrc file as we are using the 
//traditional method of compliation
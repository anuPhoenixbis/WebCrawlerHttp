//jest looks for .test.js files for testing files
const {sortPages} = require('./report.js')//importing the methods to be used from different files in this file
const {test , expect} = require('@jest/globals')//syntax of jest testing mechanism


//test cases involving the normalizing urls
test('sortPages',()=>{
    const input ={
        "https://wagslane.dev/path" : 1,
        "https://wagslane.dev" : 3
    }
    const actual = sortPages(input)//holds our output after the process is done
    const expected =[//converting to array and sorting the inputs
        ["https://wagslane.dev" , 3],
        ["https://wagslane.dev/path" , 1]
    ]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})
//test cases involving the normalizing urls
test('sortPages 5 pages',()=>{
    const input ={
        "https://wagslane.dev/path" : 1,
        "https://wagslane.dev" : 3,
        "https://wagslane.dev/path1" : 2,
        "https://wagslane.dev/path2" : 9,
        "https://wagslane.dev/path3" : 5,
        "https://wagslane.dev/path4" : 7
    }
    const actual = sortPages(input)//holds our output after the process is done
    const expected =[//converting to array and sorting the inputs
        ["https://wagslane.dev/path2" , 9],
        ["https://wagslane.dev/path4" , 7],
        ["https://wagslane.dev/path3" , 5],
        ["https://wagslane.dev" , 3],
        ["https://wagslane.dev/path1" , 2],
        ["https://wagslane.dev/path" , 1]
    ]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})


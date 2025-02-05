//jest looks for .test.js files for testing files
const {normalize , getUrlsFromHTML} = require('./crawl.js')//importing the methods to be used from different files in this file
const {test , expect} = require('@jest/globals')//syntax of jest testing mechanism


//test cases involving the normalizing urls
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

//testing involving the getting of urls from html file
test('getUrlsFromHTML absolute',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.google.com">
                Google.com
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl ="https://www.google.com"
    const actual = getUrlsFromHTML(inputHTMLBody , inputBaseUrl )//holds our output after the process is done
    const expected =["https://www.google.com/"]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})

test('getUrlsFromHTML relative',()=>{//relative isn't like abs it just takes path in its a tag
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Google.com
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl ="https://www.google.com"
    const actual = getUrlsFromHTML(inputHTMLBody , inputBaseUrl )//holds our output after the process is done
    const expected =["https://www.google.com/path/"]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})

test('getUrlsFromHTML both',()=>{//relative isn't like abs it just takes path in its a tag
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.google.com/path1/">
                Google.com path1
            </a>
            <a href="/path/">
                Google.com path
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl ="https://www.google.com"
    const actual = getUrlsFromHTML(inputHTMLBody , inputBaseUrl )//holds our output after the process is done
    const expected =["https://www.google.com/path1/" ,"https://www.google.com/path/"]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism

})
test('getUrlsFromHTML badUrl',()=>{//relative isn't like abs it just takes path in its a tag
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Google.com invalid
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl ="https://www.google.com"
    const actual = getUrlsFromHTML(inputHTMLBody , inputBaseUrl )//holds our output after the process is done
    const expected =[]//holds our expected output
    expect(actual).toEqual(expected)//using the expect method to check if the test runs or not 
//basically jest is testing mechanism
})
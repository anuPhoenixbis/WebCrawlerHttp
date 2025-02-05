const {JSDOM} = require("jsdom")//importing jsdom

async function crawlPage(currentURL){
    console.log("crawling : " +currentURL);
    try {
        const resp = await fetch(currentURL)//fetching the url in this obj
        if(resp.status>399){
            console.log("error status code: "+ resp.status+ " on page " + currentURL);
            return
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){//checking if the content is non-html or not
            console.log("non-html response");//might me image or something
            return 
        }

        const text = await resp.text();
        console.log(text);//getting its text
        
    } catch (error) {
        console.log(error);
        
    }
    
}

function getUrlsFromHTML(htmlBody,baseUrl) {
    const urls =[]
    const dom =  new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')//this line returns us a list of all things in the specified tags , here a tag
    for(const linkElement of linkElements){
        if (linkElement.href.slice(0,1)==='/') {
            //relative url
            try {
                
                const urlObj = new URL(baseUrl+linkElement.href)//if the url isn't a valid usrl this obj while being created 
                //throws an error
                urls.push(baseUrl+linkElement.href)
            } catch (err) {
                console.log("Invalid URL"+err);
                
            }
        } else {
            //abs url
            try {
                
                const urlObj = new URL(linkElement.href)//if the url isn't a valid usrl this obj while being created 
                //throws an error
                urls.push(urlObj.href)
            } catch (err) {
                console.log("Invalid URL"+ err);
                
            }
        }
        
    }
    return urls
}

function normalize(urlString) {//standardization isn't done yet
    const urlObj = new URL(urlString)
    const hostPath =  urlObj.hostname+urlObj.pathname
    if(hostPath.length > 0 && hostPath.slice(-1)=== '/')//slice gets the last character
    {//sometimes we don't care about the  / after the url
        return hostPath.slice(0,-1)//remove the extra /
    }
    return hostPath//if there is a valid url and an extra / isn't there then return from here
}
//the basic use of this method is that sometimes many urls with slight changes in the 
//strings should point to a common page like ;
//http://www.google.com/
//https://www.google.com/
//http://google.com/
//all these should point to a common search engines thats where this normalize method comes in 


// The normalize method in the provided code is intended to process and standardize a URL string

// In Node.js, module.exports is the object that is returned when you require() 
// a module. This allows you to expose variables, functions, classes, or any other
//  JavaScript value from one file to another.

module.exports={
    normalize,//to make this method available to other js files
    getUrlsFromHTML,
    crawlPage
}
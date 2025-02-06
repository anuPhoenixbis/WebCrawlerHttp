const {JSDOM} = require("jsdom")//importing jsdom

async function crawlPage(baseUrl ,currentURL , pages){//baseUrl is the homepage of the site ; pages keep track of the pages of the site
    const baseurlObj = new URL(baseUrl)
    const currUrlObj = new URL(currentURL)
    
    // The purpose of this code snippet is to ensure that the crawler only processes URLs 
    // that belong to the same domain as the base URL. This is a common practice in web 
    // crawling to avoid crawling external sites and to stay within the boundaries of the target site.
    if(baseurlObj.hostname !==currUrlObj.hostname){
        return pages
    }//for the crawler to stay in the boundaries given of the current domain
    
    const normalizeCurrUrl = normalize(currentURL)//normalizing the given url
    if(pages[normalizeCurrUrl]>0){//if the current page is encountered before increment the pages list
        pages[normalizeCurrUrl]++
        return pages
    }
    //if encountered first time
    pages[normalizeCurrUrl] =1 ;
    //above lines are the external checks

    //from this point he craawling actually begins
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

        const htmlBody = await resp.text();//getting its text
        
        const nextUrls = getUrlsFromHTML(htmlBody , baseUrl)//return the urls received from the site html
        
        //we are recursively crawling the pages by starting from the homepage get the urls from that page then,
        //again calling the getUrlsFromHtml for those and the loop goes on till the above base cases aren't met 
        //and the recursion stops
        for(const nexturl of nextUrls){
            pages = await crawlPage(baseUrl , nexturl , pages)//recursive calls occur
        }

    } catch (error) {
        console.log(error);
        
    }
    return pages
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
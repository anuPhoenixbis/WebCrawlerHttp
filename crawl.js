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
    normalize//to make this method available to other js files
}
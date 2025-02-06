const {crawlPage} = require("./crawl.js")

async function main() {
    //process.argv contains the total list of args provided while the process is being executed from the terminal
    //in order to execute this process we will write "node main.js" 2 args and these must be written before providing any 3 arg of website
    //hence process.argv.length must be less than 3 if no website or 3 arg is given 
    if(process.argv.length < 3){
        console.log("no website provided");
        process.exit(1)
        //used to terminate the current process with a specified exit code.
    }
    if(process.argv.length > 3){//more than 1 websites or args aren't required
        console.log("too many  commandline args");
        process.exit(1)
        //used to terminate the current process with a specified exit code.
    }


    // for(const arg of process.argv){
    //     console.log(arg);
    //     //when website is provided these args are printed
    //     // C:\nvm4w\nodejs\node.exe :  node 
    //     // D:\VS_Code_WorkSpaces\WebCrawlerHttp\main.js :  main.js
    //     // http://example.com :  website provided

    //     //when website isn't provided then no args are printed
    // }
    const baseURL = process.argv[2] //getting the url provided
    console.log("crawl" + baseURL);
    const pages = await crawlPage(baseURL , baseURL , {})//passing the baseurl in crawlPage ; start of recursion


    // This method returns an array of the object's own enumerable property [key, value] pairs. Each element
    //  in the array is a two-element array where the first element is the key and the second element is the value.
    //pages is an object then we can iterate the entries of the pages object
    for(const page of Object.entries(pages)){//iterating the pages
        console.log(page);
        
    }

}
main()
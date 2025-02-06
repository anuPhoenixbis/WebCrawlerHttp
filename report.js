function printReport(pages){
    console.log("______________________________");
    console.log("REPORT");
    console.log("______________________________");
    const sortedPages = sortPages(pages)//passing the sorted pages from the sortPages method into this obj
    for (const sortedPage of sortedPages) {//traversing all the entries
        
        
        const url = sortedPage[0]//gets the urls
        const hits = sortedPage[1]//gets their accordance hit count
        
        console.log(`Found ${hits} links to the page :  ${url} `);
    }
    
    console.log("______________________________");
    console.log("END OF REPORT");
    console.log("______________________________");
    
}

function sortPages(pages){
    const pagesArr = Object.entries(pages)//traversing the entries of the pages obj
    pagesArr.sort((a,b)=>{//sorting them according their number of occurrences 
        aHits = a[1]
        bHits=b[1]
        return b[1]-a[1]//sorting on descending order
    }) 
    return pagesArr
}

module.exports={
    sortPages,
    printReport
}

 import reddit from './redditapi';


const searchForm=document.getElementById('search-form');
const searchInput=document.getElementById('search-input');

// Form event listener
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
// get search term
    const searchTerm= searchInput.value;
    //get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // get limit
    const searchLimit=document.getElementById('limit').value;
      

    // check input if empty
    if(searchTerm=== ''){
        showMessage('Please add a search term','alert-danger');
    }
    // to clear input after search
    searchInput.value='';

    // search reddit
    reddit.search(searchTerm,searchLimit,sortBy).then(results=>{
        let output='<div class="card-columns">'
        // loop through post
        results.forEach(post=>{
            console.log('results');
                      
            output+=`
            <div class="card">
   <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
  </div>
</div>
            `;
        })
        output +='</div>';
        document.getElementById('results').innerHTML=output;

    }) 
    
})
// show function to output thr message
function showMessage(message,className){
    // create div
    const div= document.createElement('div')
    // add classes
div.className=`alert ${className}`;
// add text
div.appendChild(document.createTextNode(message));
// get parent
const searchContainer=document.getElementById('search-container')
// get search
const search= document.getElementById('search');
// insert message
searchContainer.insertBefore(div, search);

// timeout the alert
setTimeout(()=> document.querySelector('.alert').remove(),3000)


}

// truncate text
function truncateText(text,limit){
    const shortened =text.indexOf('', limit);
    if(shortened ==-1)return text;
    return text.substring(0, shortened);
}

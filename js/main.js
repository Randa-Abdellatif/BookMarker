var setNameInput =document.getElementById('setName');
var siteURLInput = document.getElementById('siteURL');
var nameRequired = document.getElementById('nameRequired');
var urlRequired = document.getElementById('urlRequired');
var addBtn =document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var bookmarkContainer = [];

if(localStorage.getItem("bookmark") != null)
{
    bookmarkContainer = JSON.parse( localStorage.getItem("bookmark"));
    displayBookmak(bookmarkContainer);
}

function addBookmark(x)
{
    if(validateBookmark(setNameInput) == false  || validateBookmark(siteURLInput)==false)
    {
        if(validateBookmark(setNameInput) == false )
        {
            formRequired(nameRequired);
        }
        else{formRequiredValidate(nameRequired);}
    if(validateBookmark(siteURLInput)==false)
    {
        formRequired(urlRequired);
    }
    else{formRequiredValidate(urlRequired);}
}
    else
    {
        formRequiredValidate(nameRequired);
        formRequiredValidate(urlRequired);
        var bookmark = {
            setName:setNameInput.value,
            siteURL:siteURLInput.value
        }
        if(x=='addBtn'){
        bookmarkContainer.push(bookmark);}
        else 
        {
            bookmarkContainer.splice(x,1,bookmark);
            addBtn.classList.remove('d-none');
            updateBtn.classList.add('d-none');
        }
        localStorage.setItem("bookmark",JSON.stringify(bookmarkContainer));
        displayBookmak(bookmarkContainer);
        clearForm();
        console.log(bookmarkContainer)
    }
    
}

function displayBookmak(arr)
{
    var cartoona=``;
    for(var i=0;i<arr.length;i++)
    {
        cartoona+=`<div class="site d-flex">
        <h4 class="w-25">${arr[i].setName}</h4>
        <a class=" btn btn-primary mx-2" href="${arr[i].siteURL}" target="_blank">visit</a>
        <button onclick="deleteBookmark(${i});" class="btn btn-danger mx-2">Delete</button>
        <button onclick="setFormForUpdate(${i})" class="btn btn-warning mx-2">Update</button>
    </div>`
    }
    document.getElementById('bookmarkList').innerHTML=cartoona;
}

function clearForm()
{
    setNameInput.value='';
    siteURLInput.value='';
}

function deleteBookmark(x)
{
    bookmarkContainer.splice(x,1);
    localStorage.setItem("bookmark",JSON.stringify(bookmarkContainer));
    displayBookmak(bookmarkContainer);
}

function validateBookmark(input)
{
    var regex=/./;
    return regex.test(input.value);
}

function formRequired(r){
    r.classList.replace('d-none','d-block');
}

function formRequiredValidate(r){
    r.classList.replace('d-block','d-none');
}

function setFormForUpdate(i){
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    setNameInput.value = bookmarkContainer[i].setName;
    siteURLInput.value = bookmarkContainer[i].siteURL;
    var updateBookmark =`<button onclick="addBookmark(${i})" class="btn btn-warning mt-4">Update</button>`
    document.getElementById("updateBtn").innerHTML = updateBookmark;
}


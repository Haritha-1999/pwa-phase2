var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query)
{
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb= window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
var open=idb.open("StoreData",1);
console.log("IndexedDb is created")

open.onupgradeneeded=function(event)
{
var request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error)
{
  console.log("object store is not created",+error);

}
open.onsuccess=function(event)
{
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function(data)
  {
    console.log(data.target.result);
    display(data.target.result);
    education(data.target.result);
    skills(data.target.result);

  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="images/user.svg";
  left.append(img);
  var h2=document.createElement("h2");
  h2.textContent=data.name;
  left.append(h2);
  var hh=document.createElement("hr");
left.append(hh);
 var h4=document.createElement("h4");
  h4.textContent=data.email;
  left.append(h4);
  var h4=document.createElement("h4");
  h4.textContent=data.roll;
  left.append(h4);
  var h4=document.createElement("h4");
  h4.textContent=data.mobile;
  left.append(h4);
//right
var head=document.createElement("h1");
head.textContent="career objective";
right.append(head);
var hh=document.createElement("hr");
right.append(hh);
var pc=document.createElement("p");
pc.textContent=data.career;
right.append(pc);
}
function education(ed)
{
var h1=document.createElement("h1");
h1.textContent="Educational details";
right.append(h1);
var table=document.createElement('table')
table.border="1";
let row='';
row +="<tr>"
+"<th>"+"name of institute" +"</th>"
+"<th>"+"degree"+"</th>"+
"<th>"+"branch"+"</th>"+
"<th>"+"percentage"+"</th>"+
"</tr>";
for(i in ed.education){
row +="<tr>"
+"<td>"+ed.education[i].college +"</td>"
+"<td>"+ed.education[i].degree+"</td>"+
"<td>"+ed.education[i].branch+"</td>"+
"<td>"+ed.education[i].marks+"</td>"+
"</tr>";
table.innerHTML=row;
right.appendChild(table);
}
}

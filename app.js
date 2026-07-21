const assignments=[
'Assignment 1','Assignment 2','Assignment 3','Assignment 4','Assignment 5'
];
const ul=document.getElementById('assignments');
assignments.forEach(a=>{
 const li=document.createElement('li');
 li.textContent=a+' - Not Started';
 ul.appendChild(li);
});
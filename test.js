A().then((data)=>{
  setTimeout(()=>{D()}, 3000)
});

async function A(){
setTimeout(()=>{B()}, 2000)
await setTimeout(()=>{C()}, 1000)

}

function B(){
  console.log("B");
}

function C(){
  console.log("C");
}

function D(){
  console.log("D");
}

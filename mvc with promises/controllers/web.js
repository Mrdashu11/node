module.exports.index=async(req,res)=>{
 try{
    await res.render("index")
 }
 catch(err){
console.log(err)
 }
}
module.exports.home=async(req,res)=>{
    try{
        await res.render("home")
     }
     catch(err){
    console.log(err)
     }
   }
module.exports.about=async(req,res)=>{
    try{
        await res.render("about")
     }
     catch(err){
    console.log(err)
     }
   }
   
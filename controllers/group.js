module.exports = function(){
    return {
        SetRouting :function(router){
            router.get('/group/:name',this.groupPage);

        },
        groupPage:function(req,res){
            const name=req.params.name;
            console.log("Name of Club",name);
            console.log("user.req",req.user);
            res.render('groupchat/group',{title:'FOOTBALL',user:req.user,groupName:name});

        }
    }
}
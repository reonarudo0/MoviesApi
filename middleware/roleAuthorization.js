
module.exports = function(permitedRoles)
{
    return async (req,res,next)=>
    {
        const permited = permitedRoles.includes(req.user.role);
        if(!permited) return res.status(403).send('Access Denied.');
        next();
    }    
}
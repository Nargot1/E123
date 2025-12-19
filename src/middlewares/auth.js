function ensureLoggedIn(req,res,next){
  const account = req.cookies && req.cookies.account;
  if(account) return next();
  return res.redirect('/login');
}

module.exports = { ensureLoggedIn };
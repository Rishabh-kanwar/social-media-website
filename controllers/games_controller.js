module.exports.pong=function(req, res){
    return res.render('pong',{
        title: "PING PONG",
    });
}

module.exports.snake=function(req, res){
    return res.render('snake',{
        title: "Snake Game",
    });
}
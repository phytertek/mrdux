var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};const{curryModule}=require('./core'),has=(a,b)=>b.hasOwnProperty(a),keys=a=>Object.keys(a),vals=a=>Object.values(a),entries=a=>Object.entries(a),assign=(a,b,c)=>_extends({},c,{[a]:b}),remove=(a,b)=>keys(b).reduce((c,d)=>a===d?c:_extends({},c,{[d]:b[d]}),{}),evolve=(a,b)=>keys(a).reduce((c,d)=>has(d)(b)?_extends({},c,{[d]:a[d](b[d])}):c,b),getFirstKey=a=>keys(a)[0],getLastKey=a=>keys(a).slice(-1)[0],getFirstVal=a=>a[getFirstKey(a)],getLastVal=a=>a[getLastKey(a)],dropFirstKey=a=>remove(getFirstKey(a))(a),dropLastKey=a=>remove(getLastKey(a))(a),nAry={has,assign,remove,evolve},unary={keys,vals,entries,getFirstKey,getLastKey,getFirstVal,getLastVal,dropFirstKey,dropLastKey};module.exports=_extends({},unary,curryModule(nAry));
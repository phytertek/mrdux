var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};const{curry}=require('./core'),mapToId=a=>a.reduce((a,b)=>!b._id&&!b.id?a:_extends({},a,{[b._id||b.id]:b}),{}),arrMapWithId=a=>Object.keys(a).map(b=>_extends({},a[b],{id:b})),newUid=a=>{const b=Date.now();return a.hasOwnProperty(b)?newUid(a):b},assignUid=curry((a,b)=>_extends({},b,{[newUid(b)]:a}));module.exports={mapToId,arrMapWithId,newUid,assignUid};
'use strict';function getUrlParam(url){if(url){var query=url.split('?');if(query[1]){var data={},queries=query[1].split('&');for(var i=0;i<queries.length;i++){var item=queries[i].split('=');data[item[0]]=decodeURIComponent(item[1])}return data}}return''}function removeUrlParam(url,parameter){var urlparts=url.split('?');if(urlparts.length>=2){var prefix=encodeURIComponent(parameter)+'=';var pars=urlparts[1].split(/[&;]/g);for(var i=pars.length;i-->0;){if(pars[i].lastIndexOf(prefix,0)!==-1){pars.splice(i,1)}}url=urlparts[0]+(pars.length>0?'?'+pars.join('&'):'');return url}else{return url}}function generateCacheNumber(perMinute){var d=new Date();var fix=('00'+(d.getMonth()+1)).slice(-2)+''+('00'+d.getDate()).slice(-2)+''+d.getFullYear()+'-'+('00'+d.getHours()).slice(-2)+'';var rate=d.getMinutes();var maxminute=60,intervalminute=perMinute,n=0,i;for(i=0;i<=maxminute;i+=intervalminute){if(i<=rate){n++}}return fix+n}function _ajax(path,objData,_cb){$.ajax({type:'POST',url:'https://api-otda.kemendagri.go.id/'+path,headers:{'Content-Type':'application/json','promaps-api-key':'$2a$10$a8vi9gFscvyiXnKoNepQEOIJjNRRYcIRH3aiJfqHVO4XIntycL/ZK'},data:JSON.stringify(objData)}).done(function(data){if(_cb&&typeof _cb==='function'){_cb(null,data)}}).fail(function(xhr){if(_cb&&typeof _cb==='function'){_cb(xhr.responseText,null)}})}function geoIp(_cb){$.ajax({type:'GET',url:'https://api.ipify.org?format=json&_='+generateCacheNumber(5)}).done(function(data){if(_cb&&typeof _cb==='function'){_cb(null,data.ip)}}).fail(function(xhr){if(_cb&&typeof _cb==='function'){_cb(xhr.responseText,null)}})}function getUserInfo(suffix,type){suffix=(suffix===undefined?'data':suffix);type=(type===undefined?'':type);var key=promaps_prefix+suffix;if(storage.has(key)){var data=storage.get(key);var result=JSON.parse(Base64.decode(TextObfuscator.decode(data.secret,3)));return result}switch(type){case'guest':return{user_id:''};default:return false}}function getToken(){var key=promaps_prefix+'data';if(storage.has(key)){return storage.get(key).token}return false}function checkSession(_cb){try{if(storage.has(promaps_prefix+'data')){promaps_data=storage.get(promaps_prefix+'data');if(new Date().getTime()>promaps_data.expire){storage.remove(promaps_prefix+'data');if(_cb&&typeof _cb==='function'){_cb('Session expired!!!',null);return false}}if(_cb&&typeof _cb==='function'){_cb(null,true)}return true}else{if(_cb&&typeof _cb==='function'){_cb('Session not available!!!',null)}}}catch(err){if(_cb&&typeof _cb==='function'){_cb(err,null)}}return false}function getVisitorInfo(_cb){geoIp(function(err,ip){if(err)return console.log(err);$.ajax({type:'GET',url:'https://otda.kemendagri.go.id/api/visitor?ip='+ip+'&_='+generateCacheNumber(5),headers:{'x-token':'otda-internal-api'}}).done(function(data){if(_cb&&typeof _cb==='function'){_cb(null,data)}}).fail(function(xhr){if(_cb&&typeof _cb==='function'){_cb(xhr.responseText,null)}})})}function searchText(source,find){return(source.indexOf(find)!==-1)}function searchInArray(value,array){var result=false;for(var i=0;i<array.length;i++){if(value.indexOf(array[i])>-1){result=true}}return result}function hasScheme(str){return(str.substr(0,7).toLowerCase()==='http://'||str.substr(0,8).toLowerCase()==='https://')}function striptag(str){str=str.replace(/(<([^>]+)>)/gi,'');return str}function slugify(str){str=str.replace(/^\s+|\s+$/g,'');str=str.toLowerCase();var from='ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;',to='AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';for(var i=0,l=from.length;i<l;i++){str=str.replace(new RegExp(from.charAt(i),'g'),to.charAt(i))}str=str.replace(/[^a-z0-9 -]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');return str}function capitalize(str){if(typeof str==='string'){return str.replace(/^\w/,c=>c.toUpperCase())}return''}function shortDescription(text){return text.substring(0,100)+'...'}function autoNumbering(arrayObj){for(var i=0;i<arrayObj.length;i++){arrayObj[i].no=(i+1)}}function formatBytes(bytes,decimals=2){if(bytes===0)return'0 Bytes';var k=1024,dm=decimals<0?0:decimals,sizes=['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'],i=Math.floor(Math.log(bytes)/Math.log(k));return parseFloat((bytes/Math.pow(k,i)).toFixed(dm))+' '+sizes[i]}function generateHash(str){return TextObfuscator.encode(Base64.encode(str),3)}function sendAlert(el,type,html){var div=$(el);div.html('');div.html('<div class="alert alert-'+type+' alert-dismissible fade show" role="alert">'+html+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')}function sendAlertBS5(el,type,html){var div=$(el);div.html('');div.html('<div class="alert alert-'+type+' alert-dismissible fade show" role="alert">'+html+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')}function escapeWithJSON(str){return JSON.stringify(str).slice(1,-1)}function logout(){_ajax('panel_api/panellogout',{application_id:1,application_version_number:1,user_id:getUserInfo().user_id,token:getToken(),access:deviceInfo},function(err,res){if(err){return console.log(err)}var key=promaps_prefix+'data';storage.remove(key);if(!storage.has(key)){location.href='./login'}})}var userAgent=window.navigator.userAgent.toLowerCase();var browserName=userAgent.indexOf('edge')>-1?'edge':userAgent.indexOf('edg')>-1?'chromium based edge':userAgent.indexOf('opr')>-1&&window.opr?'opera':userAgent.indexOf('chrome')>-1&&window.chrome?'chrome':userAgent.indexOf('trident')>-1?'ie':userAgent.indexOf('firefox')>-1?'firefox':userAgent.indexOf('safari')>-1?'safari':'other';var deviceInfo={imei:'',fcm_token:'',operating_system:window.navigator.oscpu,browser_name:capitalize(browserName),device_name:navigator.product};geoIp(function(err,ip){if(err)return console.log(err);deviceInfo.ip_address=ip});var urlQuery=getUrlParam(window.location.href);var storage=new BrowserStorageClass(window.localStorage);var promaps_prefix='promaps_',promaps_data=null;
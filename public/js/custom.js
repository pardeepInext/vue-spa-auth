// //const { default: Echo } = require("laravel-echo");

// let echo = new Echo({
//     broadcaster: 'pusher',
//     key: pusherKey,
//     cluster: cluster,
//     encrypted: true
// });

// echo.channel('message').listen('App\Events\Message',(e)=>{
//     console.log(e);
// })

window.Echo.channel('laravel-chat').listen('Message', (e)=>{
      console.log(e);
});
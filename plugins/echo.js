import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: '7d65294556a4568cae7f', // .env
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: true,
    disableStats: true
  })

  inject('echo', echo)
}
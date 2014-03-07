var Vue = require('vue')
require('./howler')

new Vue({
  el:"body",
  data: {
    display:"25:00",
    time: 1500,
    lastTime: null,
    timer: null,
  },
  methods: {
    start: function(time) {
      var self = this

      if(this.timer !== null) {
        clearInterval(this.timer)
      }

      if(time === 0) {
        time = 1500;
      }

      this.time = this.lastTime = time
      this.timer = setInterval(function() {
        self.time -= 1
        self.display = self.formatDisplay()
        if (self.time === 0) {
          //howler
          new Howl({urls:['alarm.mp3']}).play();
         clearInterval(self.timer)
        }
      },1000)
    },
    stop: function() {
      clearInterval(this.timer)
    },
    reset: function() {
      this.stop()
      this.start(this.lastTime)
    },
    formatDisplay: function() {
      var time = this.time,
          minutes = Math.floor(time / 60),
          seconds = time % 60,
          displayMinutes,
          displaySeconds;
      
      if(minutes >= 10) {
        displayMinutes = minutes
      } else {
        displayMinutes = "0"+minutes
      }

      if(seconds >= 10) {
        displaySeconds = seconds
      } else {
        displaySeconds = "0"+seconds
      }
      
      return displayMinutes + ":" + displaySeconds
    }
  },
  created: function() {
  }
})

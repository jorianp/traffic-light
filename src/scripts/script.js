TweenLite.defaultEase = Expo.easeOut;


function red() {
    document.querySelector('.traffic-light-2').classList.add('hide');
    document.querySelector('.traffic-light-3').classList.add('hide');
    document.querySelector('.traffic-light-1').classList.remove('hide');
    document.querySelector('.traffic-light-2').classList.remove('check');
}

function yellow() {
    document.querySelector('.traffic-light-1').classList.add('hide');
    document.querySelector('.traffic-light-3').classList.add('hide');
    document.querySelector('.traffic-light-2').classList.remove('hide');
    document.querySelector('.traffic-light-1__red').classList.remove('blink');
    document.querySelector('.traffic-light-1__yellow').classList.remove('blink-after');
    document.querySelector('.traffic-light-1__green').classList.remove('blink-after');
    document.querySelector('.traffic-light-3__red').classList.remove('blink-after');
    document.querySelector('.traffic-light-3__yellow').classList.remove('blink-after');
    document.querySelector('.traffic-light-3__green').classList.remove('blink'); 
}

function green() {
    document.querySelector('.traffic-light-1').classList.add('hide');
    document.querySelector('.traffic-light-2').classList.add('hide');
    document.querySelector('.traffic-light-3').classList.remove('hide');
    document.querySelector('.traffic-light-2').classList.add('check');
}

function redOrGreen() {
    if (document.querySelector('.traffic-light-2').classList.contains('check')) {
        document.location.hash = '#/1';
    } else document.location.hash = '#/3';
}


function initTimer (t) {
   
    var self = this,
        timerEl = document.querySelector('.timer'),
        secondsGroupEl = timerEl.querySelector('.clock__seconds-group'),
 
        secondsGroup = {
           firstNum: secondsGroupEl.querySelector('.seconds-group__first'),
           secondNum: secondsGroupEl.querySelector('.seconds-group__second')
        };
 
    var time = {
       sec: t
    };
 
    var timeNumbers;
 
    function updateTimer() {
 
       var timestr;
       var date = new Date();
 
       date.setHours(0);
       date.setMinutes(0);
       date.setSeconds(time.sec);
 
       var newDate = new Date(date.valueOf() - 1000);
       var temp = newDate.toTimeString().split(" ");
       var tempsplit = temp[0].split(':');
 
       time.min = tempsplit[1];
       time.sec = tempsplit[2];
 
       timestr = time.min + time.sec;
       timeNumbers = timestr.split('');
       updateTimerDisplay(timeNumbers);
 
       if(timestr != '0000')
          setTimeout(updateTimer, 1000);
 
    }
 
    function updateTimerDisplay(arr) {
       animateNum(secondsGroup.firstNum, arr[2]);
       animateNum(secondsGroup.secondNum, arr[3]);
    }
 
    function animateNum (group, arrayValue) {
 
       TweenMax.killTweensOf(group.querySelector('.number-grp__wrp'));
       TweenMax.to(group.querySelector('.number-grp__wrp'), 1.5, {
          y: - group.querySelector('.num-' + arrayValue).offsetTop
       });
 
    }
    
    setTimeout(updateTimer);
 
}






window.addEventListener('DOMContentLoaded', function() {
    window.location.replace('#/1');
    document.querySelector('.traffic-light-2').classList.add('hide');
    document.querySelector('.traffic-light-3').classList.add('hide');
})

window.addEventListener('hashchange', function() {
    if (!(document.location.hash === '#/1')) {
        if (!(document.location.hash === '#/2')) {
            if (!(document.location.hash === '#/3')) {
                return alert('ERROR');
            } else {
                green();
                initTimer('15');
                setTimeout(() => {  document.querySelector('.traffic-light-3__red').classList.add('blink-after');
                                    document.querySelector('.traffic-light-3__yellow').classList.add('blink-after');
                                    document.querySelector('.traffic-light-3__green').classList.add('blink'); 
                                    setTimeout(() => { document.location.hash = '#/2' }, 3000); 
                                }, 12000);
            }
        } else {
            yellow();
            initTimer('3');
            setTimeout(redOrGreen, 3000);
        }
    } else {
        red();
        initTimer('10');
        setTimeout(() => {  document.querySelector('.traffic-light-1__red').classList.add('blink');
                            document.querySelector('.traffic-light-1__yellow').classList.add('blink-after');
                            document.querySelector('.traffic-light-1__green').classList.add('blink-after'); 
                            setTimeout(() => { document.location.hash = '#/2' }, 3000);                       
                        }, 7000);
    }
});
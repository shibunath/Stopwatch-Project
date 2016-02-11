/*Javascript file for forward stopwatch*/   
    var h1 = document.getElementById('forward'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,days=0,
    t;

function add() /*Called after timeout of 1000 milliseconds*/
{    
        seconds++;          /*Increasing seconds after a timeout of 1000 milliseconds*/
 
    if (seconds >= 60)
    {
        seconds = 0;
        minutes++;          /*Increasing minutes after a timeout of 60 seconds*/
        if (minutes >= 60)
        {
            minutes = 0;
            hours++;        /*Increasing hours after a timeout of 60 minutes*/
            if(hours>=24)   /* If hours goes over 24 hours, increase the days */
                {
                    days++;
                    hours=0;
                }
        }
    }
   
    h1.textContent = (days ? (days > 9 ? days : "0" + days) : "00") +":"+(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);  /* Printing the timestamp 00:00:00:00 in the format of days:hours:minutes:seconds */
    
if(((days*86400)+(hours*3600)+(minutes*60)+seconds)==document.forms["form1"]["counterTarget"].value)
    {                    /*Disabling the start and stop buttons on reaching the counter target*/
        start.disabled=true;
        stop.disabled=true;   
        return;
    }
    
    timer(); /*Calling to maintain continuity of the stopwatch*/
}

function timer()  /*1000 milliseconds equals 1 second */
{            
    t = setTimeout(add, 1000);
}

/* Start button */

start.onclick = function()
{
       h1.style.textAlign="center";
    if(document.forms["form1"]["counterTarget"].value==null || 
        document.forms["form1"]["counterTarget"].value=="")    /*Avoiding non-entry*/
    {
            alert("Enter Counter Target");
    }
    else if(isNaN(document.forms["form1"]["counterTarget"].value)) /*Avoiding non-integers entry*/
    {
            alert("Enter a valid integer for Counter Target");
    }
    else
    {
     start.disabled=true;  /*Disabling the start button after starting the watch to avoid multiple                             starts*/
     timer();  /*Maintaining continuity of watch*/
    }
}

/* Pause button */
stop.onclick = function() {
       start.disabled=false;
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function() 
{
    h1.textContent = "00:00:00:00";
    start.disabled=false;  /*Enabling the start and stop buttons on resetting the watch*/
    stop.disabled=false;
    seconds = 0; minutes = 0; hours = 0;
    days=0;
    h1.style.textAlign="center";
}
    /*Javascript file for reverse stopwatch*/ 
    var h2 = document.getElementById('reverse'),
    starts = document.getElementById('starts'),
    stops = document.getElementById('stops'),
    clears = document.getElementById('clears'),
    second = 0, minute = 0, hour = 0,day=0,
    ti,countTarget,firstAttempt=true;

function adds()  /*Called after timeout of 1000 milliseconds*/
{
    second--; /*Decreasing seconds after a timeout of 1000 milliseconds*/

    if (second < 0) 
    {
        second = 59;
        minute--;  /*Decreasing minutes after a timeout of 60 seconds*/
        
        if (minute < 0) 
        {
            minute = 59;
            hour--;   /*Decreasing hours after a timeout of 60 minutes*/
            
            if(hour<0)
                {
                    day--;  /* If hours goes down to 0 hours, decrease the days*/
                    hour=23;
            
                    if(day<0)
                        {
                            day=0;
                        }
                }
        }
        
        
    }
    
    countTarget=(day*86400)+(hour*3600)+(minute*60)+second; /*Restoring countTarget value*/
    
    h2.textContent =(day ? (day > 9 ? day : "0" + day) : "00") +":"+(hour ? (hour > 9 ? hour : "0" + hour) : "00") + ":" + (minute ? (minute > 9 ? minute : "0" + minute) : "00") + ":" + (second > 9 ? second: "0" + second);  /* Printing the timestamp 00:00:00:00   in the format of days:hours:minutes:seconds */
    
    
if((second==0) && (day==0) && (minute==0) && (hour==0))
    {
        starts.disabled=true;   /*Disabling the start and stop buttons on reaching the counter                                      target 0 */
        stops.disabled=true;
        return;
    }
    else
    {
        timers(); /*Maintaining continuity*/
    }
}

function timers() /*1000 milliseconds equals 1 second */
{
    ti = setTimeout(adds, 1000);
}



function init()
{   
   /*If first click of start, then watch derives the value from the Counter                                Target*/
    
    /*
    If Start is clicked after the watch being paused, then the watch starts from the recent value
    */
    if(firstAttempt==true) 
        {
            countTarget=document.forms["form1"]["counterTarget"].value;
            firstAttempt=false;
        }
    
    day=parseInt(countTarget/86400);
    countTarget=countTarget-(day*86400);
    hour=parseInt(countTarget/3600);
    countTarget=countTarget-(hour*3600);
    
    minute=parseInt(countTarget/60);
    countTarget=countTarget-(minute*60);
    second=parseInt(countTarget);
    timers();  /*Calling to maintain continuity of the stopwatch*/
}

/* Start button */
starts.onclick = function()
{
    h2.style.textAlign="center";
    if(document.forms["form1"]["counterTarget"].value==null || 
        document.forms["form1"]["counterTarget"].value=="")
    {
         alert("Enter Counter Target");
    }
    else if(isNaN(document.forms["form1"]["counterTarget"].value))
    {
         alert("Enter a valid integer for Counter Target");
    }
    else
    {
         starts.disabled=true;
         init(); 
    }
}

/* Pause button */
stops.onclick = function()
{
    /*On Pausing watch, the watch starts to take the timestamp value from the storage variable          countTarget */
    
    firstAttempt=false;
    starts.disabled=false;
    clearTimeout(ti);
}

/* Clear button */
clears.onclick = function()
{
    /*On clearing watch, the watch starts to take the timestamp value from the counterTarget            textbox and resets the watch*/
    
    firstAttempt=true;
    starts.disabled=false;
    stops.disabled=false;
    
    countTarget=document.forms["form1"]["counterTarget"].value;
    day=parseInt(countTarget/86400);     /* Rounding days off to nearest integer*/
    countTarget=countTarget-(day*86400);
    hour=parseInt(countTarget/3600);     /* Rounding hours off to nearest integer*/
    countTarget=countTarget-(hour*3600);
    
    minute=parseInt(countTarget/60);     /* Rounding minutes off to nearest integer*/
    countTarget=countTarget-(minute*60);
    second=parseInt(countTarget);        /* Rounding seconds off to nearest integer*/
    
     h2.textContent =(day?((day>9)?day:"0"+day):"00")+":"+ (hour ? (hour > 9 ? hour : "0" + hour) :     "00") + ":" + (minute ? (minute > 9 ? minute : "0" + minute) : "00") + ":" + (second > 9 ?      second : "0" + second);  /*Resetting watch with counter target value*/
    
     h2.style.textAlign="center";
 
}
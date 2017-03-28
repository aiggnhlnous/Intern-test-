var IntervalID = 0,
    ID = 0;

function NextTaskID( )
{
    return ( ID++ );
}
var myVar = setInterval(myTimer, 1000);
var time = 0;


function myTimer() {
    time ++;
}
function MilsToMinsSecs( Milliseconds )
{
    var NumMillisecondsInMinute = 60000,
        NumMillisecondsInSecond = 1000,
        Minutes = 0,
        Seconds = 0;

    if ( Milliseconds >= NumMillisecondsInMinute )
    {
        Minutes = Math.floor( Milliseconds / NumMillisecondsInMinute );
        Milliseconds %= NumMillisecondsInMinute;
    }

    if ( Milliseconds >= NumMillisecondsInSecond )
    {
        Seconds = Math.round( Milliseconds / NumMillisecondsInSecond );
    }

    return( { 'Minutes': Minutes,
              'Seconds': Seconds } );

}

function StartTimer( event )
{
    var TaskID = $(this).attr('id'),
        $this  = $(this),
        Timer;

    if (IntervalID != 0)
    {
        clearInterval( IntervalID );
        IntervalID = 0;
    }
    
        Task.Timestamp = Date.now().toString();

        IntervalID = setInterval(function() {
            var HoursMinsSecs  = {},
                Interval       = 0,
                TaskArr        = RetrieveTaskArr( );
                Task           = TaskArr[TaskID],
                TotElapsedTime = parseInt(Task.TotElapsedTime),
                TaskTimestamp  = parseInt(Task.Timestamp),
                Timer          = $this.find( '#' + TaskID + '_timer' );

            //  How long has it been since the timer was started?
            Interval = Date.now() - TaskTimestamp;

            //  Convert the total running time, in ms, to hours/mins/secs.
            HoursMinsSecs = ConvertMillisecondsToHoursMinsSecs( Interval + TotElapsedTime );

            //  Update the timer in the DOM.
            Timer.text(HoursMinsSecs.Hours + ':' + HoursMinsSecs.Minutes + ':' + HoursMinsSecs.Seconds);

            //  Save, to DOM local storage, how much time has passed since the
            //  timer was last started so that, if the window is closed while
            //  the timer is still running, we can properly restore the task
            //  when the page is re-loaded.
            Task.ElapsedSince = Interval.toString();
        }, 1000); // setInterval

}  // StartTimer

function SubmitTask( event )
{
    var FormTextField = $( '#Form_TaskName' ),
        StartTimerField = $( '#StartTimer' ),
        StartTimer = StartTimerField.val(),
        TaskName   = FormTextField.val(),
        TaskID     = -1;

        FormTextField.val( '' );
        StartTimerField.val( 0 );
        
        if ( TaskName.length > 0 )
        {
        TaskID = NextTaskID();
        AddTask( TaskID,
        { 'Name'          : TaskName,
          'Timestamp'     : 0,
          'TotElapsedTime': 0,
          'ElapsedSince'  : 0 } );

            if ( StartTimer == 1 )
            {

                $( '#' + TaskID ).trigger( 'click' );
            }

        }

    return ( TaskID );
}


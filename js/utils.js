function get_datetime() {
    let d = new Date();

    let dayname = d.toLocaleDateString('en-US', { weekday: 'long',
    timeZone: 'Europe/Oslo' });

    let day = d.toLocaleDateString('en-US', { day: 'numeric',
    timeZone: 'Europe/Oslo'})

    let month = d.toLocaleDateString('en-US', { month: 'long',
    timeZone: 'Europe/Oslo'});
    
    return { dayname, day, month, fullyear: d.getFullYear() };

    // return dayname + " " + day + "<br/>" + month + " " + d.getFullYear();
}

function get_weeknumber() {

    var weeknumber = moment("11-26-2016", "MMDDYYYY").isoWeek();

    return "Week " + weeknumber;
}
function get_datetime() {
    let d = new Date();

    let dayname = d.toLocaleDateString('en-US', { weekday: 'long',
    timeZone: 'Europe/Oslo' });

    let day = d.toLocaleDateString('en-US', { day: 'numeric',
    timeZone: 'Europe/Oslo'})

    let month = d.toLocaleDateString('en-US', { month: 'long',
    timeZone: 'Europe/Oslo'});
    
    return { dayname, day, month, fullyear: d.getFullYear() };
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
   
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
   
    var week1 = new Date(date.getFullYear(), 0, 4);
   
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
}


o(function(){
  var search = o('#search');
  search.keyup(function(){
    var val = search.val().trim()
      , jobs = o('#jobs .job');

    // show all
    if (val.length < 2) {
      pollForJobs.halt = false;
      return jobs.show();
    }

    // query
    o.get('./job/search?q=' + encodeURIComponent(val), function(jobs){
      console.log(jobs);
      if(jobs.length > 0){
        pollForJobs.halt = true;
        o('#jobs').html("");
        jobs.forEach(function(j){
          job = new Job(j);
          el = job.showProgress('active' == active)
                  .showErrorMessage('failed' == active)
                  .render(true);

          el.get(0).job = job;
          el.appendTo('#jobs');
        });
      }else{
        pollForJobs.halt = false;
      }
    });
  });
});
